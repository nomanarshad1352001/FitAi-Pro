// ============ USER DATA ============
export const currentUser = {
  id: 'usr_001',
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  avatar: '',
  age: 28,
  height: 178, // cm
  weight: 76, // kg
  targetWeight: 72,
  gender: 'male',
  fitnessLevel: 'Intermediate',
  goals: ['Weight Loss', 'Muscle Gain', 'Endurance'],
  joinDate: '2024-09-15',
  streak: 14,
  plan: 'Pro',
  planExpiry: '2025-09-15',
  preferences: {
    dietType: 'Balanced',
    allergies: ['Peanuts'],
    workoutPreference: 'Gym + Home',
    notificationsEnabled: true,
    darkMode: false,
  },
};

// ============ WEEKLY ACTIVITY DATA ============
export const weeklyActivity = [
  { day: 'Mon', calories: 420, steps: 8200, duration: 45, workoutType: 'Strength' },
  { day: 'Tue', calories: 380, steps: 10500, duration: 35, workoutType: 'Cardio' },
  { day: 'Wed', calories: 510, steps: 6300, duration: 55, workoutType: 'HIIT' },
  { day: 'Thu', calories: 290, steps: 12100, duration: 30, workoutType: 'Yoga' },
  { day: 'Fri', calories: 460, steps: 9400, duration: 50, workoutType: 'Strength' },
  { day: 'Sat', calories: 620, steps: 15200, duration: 70, workoutType: 'CrossFit' },
  { day: 'Sun', calories: 180, steps: 4500, duration: 20, workoutType: 'Recovery' },
];

// ============ MONTHLY PROGRESS DATA ============
export const monthlyProgress = [
  { month: 'Jan', weight: 82, bodyFat: 22, muscle: 38, score: 62 },
  { month: 'Feb', weight: 80.5, bodyFat: 21.2, muscle: 38.5, score: 65 },
  { month: 'Mar', weight: 79.8, bodyFat: 20.5, muscle: 39, score: 68 },
  { month: 'Apr', weight: 78.2, bodyFat: 19.8, muscle: 39.5, score: 72 },
  { month: 'May', weight: 77.5, bodyFat: 19, muscle: 40, score: 75 },
  { month: 'Jun', weight: 76.8, bodyFat: 18.5, muscle: 40.5, score: 78 },
  { month: 'Jul', weight: 76, bodyFat: 18, muscle: 41, score: 82 },
];

// ============ TODAY'S NUTRITION ============
export const todayNutrition = {
  calories: { consumed: 1650, target: 2200, unit: 'kcal' },
  protein: { consumed: 95, target: 150, unit: 'g' },
  carbs: { consumed: 180, target: 250, unit: 'g' },
  fat: { consumed: 52, target: 70, unit: 'g' },
  fiber: { consumed: 18, target: 30, unit: 'g' },
  water: { consumed: 6, target: 8, unit: 'glasses' },
};

export const mealLog = [
  {
    id: 'm1',
    meal: 'Breakfast',
    time: '7:30 AM',
    items: [
      { name: 'Oatmeal with Berries', calories: 320, protein: 12, carbs: 52, fat: 8 },
      { name: 'Greek Yogurt', calories: 150, protein: 18, carbs: 8, fat: 5 },
    ],
    totalCalories: 470,
    icon: '🌅',
  },
  {
    id: 'm2',
    meal: 'Snack',
    time: '10:00 AM',
    items: [
      { name: 'Protein Bar', calories: 200, protein: 20, carbs: 22, fat: 8 },
    ],
    totalCalories: 200,
    icon: '🍎',
  },
  {
    id: 'm3',
    meal: 'Lunch',
    time: '12:30 PM',
    items: [
      { name: 'Grilled Chicken Salad', calories: 420, protein: 35, carbs: 18, fat: 22 },
      { name: 'Whole Wheat Bread', calories: 140, protein: 5, carbs: 26, fat: 2 },
    ],
    totalCalories: 560,
    icon: '🥗',
  },
  {
    id: 'm4',
    meal: 'Dinner',
    time: '7:00 PM',
    items: [
      { name: 'Salmon with Quinoa', calories: 480, protein: 38, carbs: 42, fat: 16 },
    ],
    totalCalories: 480,
    icon: '🍽️',
    upcoming: true,
  },
];

// ============ WORKOUT PLANS ============
export const workoutPlans = [
  {
    id: 'wp1',
    name: 'Strength Builder Pro',
    description: 'AI-optimized progressive overload program tailored to your strength goals',
    difficulty: 'Intermediate',
    duration: '8 weeks',
    frequency: '4x/week',
    type: 'Strength',
    aiGenerated: true,
    progress: 62,
    nextSession: 'Upper Body Push',
    equipment: ['Barbell', 'Dumbbells', 'Bench', 'Cable Machine'],
    image: 'strength',
  },
  {
    id: 'wp2',
    name: 'HIIT Fat Burner',
    description: 'High-intensity interval training designed to maximize calorie burn',
    difficulty: 'Advanced',
    duration: '6 weeks',
    frequency: '3x/week',
    type: 'HIIT',
    aiGenerated: true,
    progress: 35,
    nextSession: 'Tabata Circuit',
    equipment: ['Bodyweight', 'Jump Rope', 'Kettlebell'],
    image: 'hiit',
  },
  {
    id: 'wp3',
    name: 'Yoga & Flexibility',
    description: 'Improve mobility, reduce stress, and enhance recovery with guided yoga',
    difficulty: 'Beginner',
    duration: '4 weeks',
    frequency: '5x/week',
    type: 'Flexibility',
    aiGenerated: false,
    progress: 80,
    nextSession: 'Morning Flow',
    equipment: ['Yoga Mat', 'Blocks'],
    image: 'yoga',
  },
  {
    id: 'wp4',
    name: 'Marathon Prep',
    description: 'Structured running program with progressive distance and speed work',
    difficulty: 'Advanced',
    duration: '12 weeks',
    frequency: '5x/week',
    type: 'Cardio',
    aiGenerated: true,
    progress: 15,
    nextSession: '5K Tempo Run',
    equipment: ['Running Shoes', 'GPS Watch'],
    image: 'running',
  },
];

// ============ TODAY'S WORKOUT ============
export const todayWorkout = {
  name: 'Upper Body Push — Day 3',
  plan: 'Strength Builder Pro',
  estimatedDuration: 55,
  caloriesBurn: 380,
  exercises: [
    { id: 'e1', name: 'Barbell Bench Press', sets: 4, reps: '8-10', weight: '80kg', rest: '90s', completed: true, muscleGroup: 'Chest' },
    { id: 'e2', name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', weight: '28kg', rest: '75s', completed: true, muscleGroup: 'Upper Chest' },
    { id: 'e3', name: 'Overhead Press', sets: 4, reps: '6-8', weight: '50kg', rest: '90s', completed: false, muscleGroup: 'Shoulders' },
    { id: 'e4', name: 'Cable Lateral Raises', sets: 3, reps: '12-15', weight: '10kg', rest: '60s', completed: false, muscleGroup: 'Shoulders' },
    { id: 'e5', name: 'Tricep Dips', sets: 3, reps: '10-12', weight: 'BW', rest: '60s', completed: false, muscleGroup: 'Triceps' },
    { id: 'e6', name: 'Skull Crushers', sets: 3, reps: '10-12', weight: '25kg', rest: '60s', completed: false, muscleGroup: 'Triceps' },
  ],
};

// ============ AI RECOMMENDATIONS ============
export const aiRecommendations = [
  {
    id: 'ai1',
    type: 'workout',
    title: 'Add More Volume to Chest',
    description: 'Based on your progress data, your chest development has plateaued. Consider adding 2 more sets of flyes on push days.',
    confidence: 92,
    priority: 'high',
    icon: '💪',
    actionLabel: 'Update Plan',
  },
  {
    id: 'ai2',
    type: 'nutrition',
    title: 'Increase Protein Intake',
    description: 'You\'re consistently 20-30g below your protein target. Try adding a post-workout shake or an extra serving of chicken.',
    confidence: 88,
    priority: 'high',
    icon: '🥩',
    actionLabel: 'See Meal Ideas',
  },
  {
    id: 'ai3',
    type: 'recovery',
    title: 'Prioritize Sleep Quality',
    description: 'Your recovery scores have dipped. Aim for 7-8 hours of sleep and consider reducing screen time before bed.',
    confidence: 85,
    priority: 'medium',
    icon: '😴',
    actionLabel: 'Sleep Tips',
  },
  {
    id: 'ai4',
    type: 'workout',
    title: 'Try Tempo Training',
    description: 'Introducing a 3-1-2 tempo on your compound lifts could help break through your current plateau.',
    confidence: 78,
    priority: 'medium',
    icon: '⏱️',
    actionLabel: 'Learn More',
  },
  {
    id: 'ai5',
    type: 'wellness',
    title: 'Stress Management Alert',
    description: 'Your cortisol indicators suggest elevated stress. Consider adding 10 min of meditation to your morning routine.',
    confidence: 82,
    priority: 'low',
    icon: '🧘',
    actionLabel: 'Start Session',
  },
];

// ============ SUBSCRIPTION PLANS ============
export const subscriptionPlans = [
  {
    id: 'plan_free',
    name: 'Free',
    price: 0,
    period: 'forever',
    features: [
      'Basic workout tracking',
      '3 preset workout plans',
      'Daily calorie logging',
      'Community access',
    ],
    limitations: [
      'No AI recommendations',
      'No custom plans',
      'Ads included',
    ],
    popular: false,
    current: false,
  },
  {
    id: 'plan_pro',
    name: 'Pro',
    price: 14.99,
    period: '/month',
    annualPrice: 9.99,
    features: [
      'Unlimited workout plans',
      'AI-powered recommendations',
      'Advanced nutrition tracking',
      'Progress analytics',
      'Custom meal plans',
      'Priority support',
      'No ads',
    ],
    limitations: [],
    popular: true,
    current: true,
  },
  {
    id: 'plan_elite',
    name: 'Elite',
    price: 29.99,
    period: '/month',
    annualPrice: 19.99,
    features: [
      'Everything in Pro',
      'Personal AI coach',
      'Video form analysis',
      'Live trainer sessions',
      'Wearable integrations',
      'Family plan (up to 4)',
      'Advanced body composition',
      'White-glove onboarding',
    ],
    limitations: [],
    popular: false,
    current: false,
  },
];

// ============ NOTIFICATIONS ============
export const notifications = [
  { id: 'n1', type: 'workout', title: 'Workout Reminder', message: 'Upper Body Push session starts in 30 minutes!', time: '30 min ago', read: false, icon: '🏋️' },
  { id: 'n2', type: 'achievement', title: 'New Achievement!', message: 'You\'ve completed a 14-day workout streak! 🔥', time: '2 hours ago', read: false, icon: '🏆' },
  { id: 'n3', type: 'nutrition', title: 'Meal Logging Reminder', message: 'Don\'t forget to log your lunch!', time: '3 hours ago', read: true, icon: '🍽️' },
  { id: 'n4', type: 'ai', title: 'AI Insight Available', message: 'New personalized recommendations based on your weekly data.', time: '5 hours ago', read: true, icon: '🤖' },
  { id: 'n5', type: 'social', title: 'Friend Activity', message: 'Sarah completed her marathon training plan!', time: '1 day ago', read: true, icon: '👋' },
  { id: 'n6', type: 'system', title: 'Plan Renewal', message: 'Your Pro subscription renews in 7 days.', time: '2 days ago', read: true, icon: '💳' },
];

// ============ ACHIEVEMENTS ============
export const achievements = [
  { id: 'a1', name: 'First Workout', description: 'Complete your first workout', earned: true, date: '2024-09-16', icon: '🎯', xp: 50 },
  { id: 'a2', name: '7-Day Streak', description: 'Work out 7 days in a row', earned: true, date: '2024-09-22', icon: '🔥', xp: 100 },
  { id: 'a3', name: '14-Day Streak', description: 'Work out 14 days in a row', earned: true, date: '2025-01-14', icon: '🔥', xp: 200 },
  { id: 'a4', name: 'Century Club', description: 'Log 100 workouts', earned: true, date: '2025-03-10', icon: '💯', xp: 500 },
  { id: 'a5', name: 'Nutrition Master', description: 'Log meals for 30 consecutive days', earned: true, date: '2024-11-15', icon: '🥗', xp: 300 },
  { id: 'a6', name: 'Heavy Lifter', description: 'Bench press your bodyweight', earned: true, date: '2025-02-20', icon: '🏋️', xp: 250 },
  { id: 'a7', name: 'Marathon Ready', description: 'Run a total of 42.2km', earned: false, date: null, icon: '🏃', xp: 400, progress: 68 },
  { id: 'a8', name: '30-Day Streak', description: 'Work out 30 days in a row', earned: false, date: null, icon: '⚡', xp: 500, progress: 47 },
  { id: 'a9', name: 'Iron Will', description: 'Complete 500 workouts', earned: false, date: null, icon: '🦾', xp: 1000, progress: 22 },
];

// ============ LEADERBOARD ============
export const leaderboard = [
  { rank: 1, name: 'Marcus Chen', score: 9850, streak: 45, workouts: 312, avatar: '🧑‍💼' },
  { rank: 2, name: 'Sarah Williams', score: 9420, streak: 38, workouts: 298, avatar: '👩‍🦰' },
  { rank: 3, name: 'Alex Johnson', score: 8890, streak: 14, workouts: 156, avatar: '🧑', isCurrentUser: true },
  { rank: 4, name: 'Emma Davis', score: 8650, streak: 22, workouts: 245, avatar: '👩' },
  { rank: 5, name: 'James Wilson', score: 8200, streak: 19, workouts: 210, avatar: '👨' },
  { rank: 6, name: 'Lisa Park', score: 7980, streak: 31, workouts: 189, avatar: '👩‍🔬' },
  { rank: 7, name: 'David Brown', score: 7540, streak: 12, workouts: 175, avatar: '🧔' },
  { rank: 8, name: 'Nina Patel', score: 7200, streak: 28, workouts: 168, avatar: '👩‍⚕️' },
];

// ============ BODY METRICS ============
export const bodyMetrics = {
  current: {
    weight: 76,
    bodyFat: 18,
    muscleMass: 41,
    bmi: 24.0,
    restingHR: 62,
    vo2Max: 42,
    waterPercentage: 58,
  },
  goals: {
    weight: 72,
    bodyFat: 15,
    muscleMass: 44,
  },
};

// ============ SLEEP DATA ============
export const sleepData = [
  { day: 'Mon', hours: 7.5, quality: 85, deepSleep: 1.8, remSleep: 2.1 },
  { day: 'Tue', hours: 6.8, quality: 72, deepSleep: 1.4, remSleep: 1.8 },
  { day: 'Wed', hours: 8.1, quality: 91, deepSleep: 2.2, remSleep: 2.4 },
  { day: 'Thu', hours: 7.2, quality: 78, deepSleep: 1.6, remSleep: 2.0 },
  { day: 'Fri', hours: 6.5, quality: 65, deepSleep: 1.2, remSleep: 1.5 },
  { day: 'Sat', hours: 8.5, quality: 93, deepSleep: 2.4, remSleep: 2.6 },
  { day: 'Sun', hours: 7.8, quality: 87, deepSleep: 2.0, remSleep: 2.2 },
];

// ============ HEART RATE DATA ============
export const heartRateData = [
  { time: '6AM', rate: 62 },
  { time: '8AM', rate: 78 },
  { time: '10AM', rate: 72 },
  { time: '12PM', rate: 85 },
  { time: '2PM', rate: 145 },
  { time: '3PM', rate: 165 },
  { time: '4PM', rate: 130 },
  { time: '6PM', rate: 88 },
  { time: '8PM', rate: 72 },
  { time: '10PM', rate: 65 },
];

// ============ INTEGRATIONS ============
export const integrations = [
  { id: 'int1', name: 'Apple Health', connected: true, icon: '🍎', lastSync: '2 min ago', dataTypes: ['Steps', 'Heart Rate', 'Sleep'] },
  { id: 'int2', name: 'Google Fit', connected: false, icon: '🟢', lastSync: null, dataTypes: ['Steps', 'Workouts', 'Weight'] },
  { id: 'int3', name: 'Fitbit', connected: true, icon: '⌚', lastSync: '15 min ago', dataTypes: ['Steps', 'Heart Rate', 'Sleep', 'SPO2'] },
  { id: 'int4', name: 'MyFitnessPal', connected: true, icon: '📱', lastSync: '1 hour ago', dataTypes: ['Nutrition', 'Calories'] },
  { id: 'int5', name: 'Strava', connected: false, icon: '🏃', lastSync: null, dataTypes: ['Running', 'Cycling', 'Swimming'] },
  { id: 'int6', name: 'Garmin', connected: false, icon: '⏱️', lastSync: null, dataTypes: ['GPS', 'Heart Rate', 'VO2 Max'] },
];

export const analyticsOverview = {
  totalWorkouts: 156,
  totalCaloriesBurned: 52400,
  avgWorkoutDuration: 48,
  consistencyScore: 87,
  improvementRate: 12.5,
  weeklyGoalCompletion: 85,
};
