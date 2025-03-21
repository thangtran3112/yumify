declare global {
  interface PaymentMethod {
    methodId: string;
    type: string;
    lastFour: string;
    expiry: string;
  }

  interface Window {
    Clerk?: {
      session?: {
        getToken: () => Promise<string>;
      };
    };
  }

  interface UserSettings {
    theme?: "light" | "dark";
    emailAlerts?: boolean;
    smsAlerts?: boolean;
    recipeNotifications?: boolean;
    notificationFrequency?: "immediate" | "daily" | "weekly";
  }

  interface User {
    userId: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    email: string;
    publicMetadata: {
      userType: "teacher" | "student";
    };
    privateMetadata: {
      settings?: UserSettings;
      paymentMethods?: Array<PaymentMethod>;
      defaultPaymentMethodId?: string;
      stripeCustomerId?: string;
    };
    unsafeMetadata: {
      bio?: string;
      urls?: string[];
    };
  }

  interface Recipe {
    recipeId: string;
    teacherId: string;
    teacherName: string;
    title: string;
    description?: string;
    category: string;
    image?: string;
    price?: number; // Stored in cents (e.g., 4999 for $49.99)
    level: "Beginner" | "Intermediate" | "Advanced";
    status: "Draft" | "Published";
    sections: Section[];
    enrollments?: Array<{
      userId: string;
    }>;
  }

  interface Transaction {
    userId: string;
    transactionId: string;
    dateTime: string;
    recipeId: string;
    paymentProvider: "stripe";
    paymentMethodId?: string;
    amount: number; // Stored in cents
    savePaymentMethod?: boolean;
  }

  interface DateRange {
    from: string | undefined;
    to: string | undefined;
  }

  interface UserRecipeProgress {
    userId: string;
    recipeId: string;
    enrollmentDate: string;
    overallProgress: number;
    sections: SectionProgress[];
    lastAccessedTimestamp: string;
  }

  type CreateUserArgs = Omit<User, "userId">;
  type CreateRecipeArgs = Omit<Recipe, "recipeId">;
  type CreateTransactionArgs = Omit<Transaction, "transactionId">;

  interface RecipeCardProps {
    recipe: Recipe;
    onGoToRecipe: (recipe: Recipe) => void;
  }

  interface TeacherRecipeCardProps {
    recipe: Recipe;
    onEdit: (recipe: Recipe) => void;
    onDelete: (recipe: Recipe) => void;
    isOwner: boolean;
  }

  interface Comment {
    commentId: string;
    userId: string;
    text: string;
    timestamp: string;
  }

  interface Chapter {
    chapterId: string;
    title: string;
    content: string;
    video?: string | File;
    freePreview?: boolean;
    type: "Text" | "Quiz" | "Video";
  }

  interface ChapterProgress {
    chapterId: string;
    completed: boolean;
  }

  interface SectionProgress {
    sectionId: string;
    chapters: ChapterProgress[];
  }

  interface Section {
    sectionId: string;
    sectionTitle: string;
    sectionDescription?: string;
    chapters: Chapter[];
  }

  interface WizardStepperProps {
    currentStep: number;
  }

  interface AccordionSectionsProps {
    sections: Section[];
  }

  interface SearchRecipeCardProps {
    recipe: Recipe;
    isSelected?: boolean;
    onClick?: () => void;
  }

  interface RecipePreviewProps {
    recipe: Recipe;
  }

  interface CustomFixedModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
  }

  interface HeaderProps {
    title: string;
    subtitle: string;
    rightElement?: ReactNode;
  }

  interface SharedNotificationSettingsProps {
    title?: string;
    subtitle?: string;
  }

  interface SelectedRecipeProps {
    recipe: Recipe;
    handleEnrollNow: (recipeId: string) => void;
  }

  interface ToolbarProps {
    onSearch: (search: string) => void;
    onCategoryChange: (category: string) => void;
  }

  interface ChapterModalProps {
    isOpen: boolean;
    onClose: () => void;
    sectionIndex: number | null;
    chapterIndex: number | null;
    sections: Section[];
    setSections: React.Dispatch<React.SetStateAction<Section[]>>;
    recipeId: string;
  }

  interface SectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    sectionIndex: number | null;
    sections: Section[];
    setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  }

  interface DroppableComponentProps {
    sections: Section[];
    setSections: (sections: Section[]) => void;
    handleEditSection: (index: number) => void;
    handleDeleteSection: (index: number) => void;
    handleAddChapter: (sectionIndex: number) => void;
    handleEditChapter: (sectionIndex: number, chapterIndex: number) => void;
    handleDeleteChapter: (sectionIndex: number, chapterIndex: number) => void;
  }

  interface RecipeFormData {
    recipeTitle: string;
    recipeDescription: string;
    recipeCategory: string;
    recipePrice: string;
    recipeStatus: boolean;
  }
}

export { };
