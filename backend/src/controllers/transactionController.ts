import Stripe from "stripe";
import dotenv from "dotenv";
import { Request, Response } from "express";
import Recipe from "../models/recipeModel";
import Transaction from "../models/transactionModel";
import UserProgress from "../models/userProgressModel";

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
    "STRIPE_SECRET_KEY os required but was not found in env variables"
  );
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const listTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.query;

  try {
    const transactions = userId
      ? await Transaction.query("userId").eq(userId).exec()
      : await Transaction.scan().exec();

    res.json({
      message: "Transactions retrieved successfully",
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving transactions", error });
  }
};

export const createStripePaymentIntent = async (
  req: Request,
  res: Response
): Promise<void> => {
  let { amount } = req.body;

  if (!amount || amount <= 0) {
    amount = 50;
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    res.json({
      message: "",
      data: {
        clientSecret: paymentIntent.client_secret,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating stripe payment intent", error });
  }
};

export const createTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, recipeId, transactionId, amount, paymentProvider } = req.body;

  try {
    // 1. get recipe info
    const recipe = await Recipe.get(recipeId);

    // 2. create transaction record
    const newTransaction = new Transaction({
      dateTime: new Date().toISOString(),
      userId,
      recipeId,
      transactionId,
      amount,
      paymentProvider,
    });
    await newTransaction.save();
    console.log("Transaction saved:", newTransaction);
    // 3. create initial recipe progress
    const initialProgress = new UserProgress({
      userId,
      recipeId,
      enrollmentDate: new Date().toISOString(),
      overallProgress: 0,
      sections: recipe.sections.map((section: any) => ({
        sectionId: section.sectionId,
        chapters: section.chapters.map((chapter: any) => ({
          chapterId: chapter.chapterId,
          completed: false,
        })),
      })),
      lastAccessedTimestamp: new Date().toISOString(),
    });
    await initialProgress.save();
    console.log("Initial progress saved:", initialProgress);

    // 4. add enrollment to relevant recipe
    await Recipe.update(
      { recipeId },
      {
        $ADD: {
          enrollments: [{ userId }],
        },
      }
    );
    console.log("Recipe enrollment updated");

    res.json({
      message: "Purchased Recipe successfully",
      data: {
        transaction: newTransaction,
        recipeProgress: initialProgress,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating transaction and enrollment", error });
  }
};
