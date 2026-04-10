export const MODEL_RESULTS = [
  { name: "Logistic Regression", accuracy: 0.7661, precision: 0.1323, recall: 0.6800, f1: 0.2215, auc: 0.8180, specificity: 0.7706, kappa: 0.152,  cvAuc: 0.8563, cvStd: 0.0089 },
  { name: "AdaBoost",            accuracy: 0.7916, precision: 0.1279, recall: 0.5600, f1: 0.2082, auc: 0.7906, specificity: 0.8035, kappa: 0.1396, cvAuc: 0.9365, cvStd: 0.0045 },
  { name: "Naive Bayes",         accuracy: 0.3337, precision: 0.0672, recall: 0.9800, f1: 0.1258, auc: 0.7847, specificity: 0.3004, kappa: 0.0377, cvAuc: 0.8340, cvStd: 0.0120 },
  { name: "Random Forest",       accuracy: 0.9168, precision: 0.0732, recall: 0.0600, f1: 0.0659, auc: 0.7580, specificity: 0.9609, kappa: 0.0229, cvAuc: 0.9926, cvStd: 0.0015 },
  { name: "SVM (RBF)",           accuracy: 0.8229, precision: 0.0982, recall: 0.3200, f1: 0.1502, auc: 0.7327, specificity: 0.8488, kappa: 0.0815, cvAuc: 0.9523, cvStd: 0.0027 },
  { name: "XGBoost (Tuned)",     accuracy: 0.9247, precision: 0.2000, recall: 0.1800, f1: 0.1895, auc: 0.7236, specificity: 0.9630, kappa: 0.1501, cvAuc: 0.9911, cvStd: 0.0009 },
  { name: "Decision Tree",       accuracy: 0.8933, precision: 0.1446, recall: 0.2400, f1: 0.1805, auc: 0.5835, specificity: 0.9270, kappa: 0.1272, cvAuc: 0.9021, cvStd: 0.0068 },
];

export const ROC_DATA = [
  { name: "Logistic Regression", auc: 0.818,  color: "#E8323A", thick: true },
  { name: "AdaBoost",            auc: 0.7906, color: "#F97316" },
  { name: "Naive Bayes",         auc: 0.7847, color: "#8B5CF6" },
  { name: "Random Forest",       auc: 0.7580, color: "#10B981" },
  { name: "SVM (RBF)",           auc: 0.7327, color: "#3B82F6" },
  { name: "XGBoost (Tuned)",     auc: 0.7236, color: "#6366F1" },
  { name: "Decision Tree",       auc: 0.5835, color: "#9CA3AF" },
  { name: "Random Baseline",     auc: 0.500,  color: "#D1D5DB", dashed: true },
];

export const CONFUSION_MATRICES = {
  "Logistic Regression": { tn: 749, fp: 223, fn: 16, tp: 34 },
  "AdaBoost":            { tn: 781, fp: 191, fn: 22, tp: 28 },
};

export const RF_IMPORTANCE = [
  { feature: "avg_glucose_level",              importance: 0.298 },
  { feature: "age",                            importance: 0.276 },
  { feature: "bmi",                            importance: 0.168 },
  { feature: "ever_married_Yes",               importance: 0.052 },
  { feature: "Residence_type_Urban",           importance: 0.038 },
  { feature: "gender_Male",                    importance: 0.032 },
  { feature: "work_type_Private",              importance: 0.028 },
  { feature: "smoking_status_never smoked",    importance: 0.025 },
  { feature: "hypertension",                   importance: 0.022 },
  { feature: "heart_disease",                  importance: 0.019 },
  { feature: "smoking_status_smokes",          importance: 0.016 },
  { feature: "work_type_Self-employed",        importance: 0.012 },
  { feature: "smoking_status_formerly smoked", importance: 0.008 },
  { feature: "work_type_children",             importance: 0.005 },
  { feature: "work_type_Never_worked",         importance: 0.001 },
];

export const WATERFALL_PATIENT = {
  baseline: 0.038,
  finalScore: 3.072,
  contributions: [
    { feature: "avg_glucose_level",              value: 1.912,  shap: +1.13, direction: "up"   },
    { feature: "smoking_status_smokes",          value: 2.36,   shap: +0.87, direction: "up"   },
    { feature: "heart_disease",                  value: 4.203,  shap: +0.67, direction: "up"   },
    { feature: "age",                            value: 0.899,  shap: +0.35, direction: "up"   },
    { feature: "smoking_status_never smoked",    value: -0.776, shap: -0.30, direction: "down" },
    { feature: "gender_Male",                    value: 1.175,  shap: -0.21, direction: "down" },
    { feature: "smoking_status_formerly smoked", value: -0.455, shap: -0.13, direction: "down" },
    { feature: "Residence_type_Urban",           value: 0.994,  shap: -0.12, direction: "down" },
    { feature: "hypertension",                   value: -0.334, shap: +0.10, direction: "up"   },
    { feature: "work_type_Self-employed",        value: -0.437, shap: +0.06, direction: "up"   },
    { feature: "work_type_Private",              value: 0.866,  shap: +0.06, direction: "up"   },
    { feature: "ever_married_Yes",               value: 0.72,   shap: -0.04, direction: "down" },
    { feature: "bmi",                            value: 1.133,  shap: -0.03, direction: "down" },
  ]
};

export const RISK_CATEGORIES = {
  Demographic: { features: ["age", "gender_Male"],                                                          shapSum: 0.56, pct: 42.1, color: "#E8323A" },
  Clinical:    { features: ["hypertension", "heart_disease", "avg_glucose_level", "bmi"],                  shapSum: 0.47, pct: 35.3, color: "#3B82F6" },
  Lifestyle:   { features: ["smoking_status_*", "ever_married_Yes", "work_type_*", "Residence_type_Urban"],shapSum: 0.30, pct: 22.6, color: "#10B981" },
};

export const LR_COEFFICIENTS = {
  intercept:                        -2.847,
  age:                              +1.124,
  avg_glucose_level:                +0.521,
  bmi:                              +0.189,
  hypertension:                     +0.441,
  heart_disease:                    +0.387,
  gender_Male:                      +0.123,
  ever_married_Yes:                 +0.298,
  Residence_type_Urban:             -0.067,
  work_type_Private:                +0.089,
  work_type_Self_employed:          +0.142,
  work_type_children:               -0.445,
  work_type_Never_worked:           -0.398,
  smoking_status_formerly_smoked:   +0.186,
  smoking_status_smokes:            +0.243,
  smoking_status_never_smoked:      -0.112,
};

export const FEATURE_STATS = {
  age:               { mean: 43.23, std: 22.61 },
  avg_glucose_level: { mean: 105.83, std: 45.07 },
  bmi:               { mean: 28.89, std: 7.85 },
};

export const DIGIT_BITMAPS = {
  '0': [0,1,1,1,0, 1,0,0,0,1, 1,0,0,1,1, 1,0,1,0,1, 1,1,0,0,1, 1,0,0,0,1, 0,1,1,1,0],
  '1': [0,0,1,0,0, 0,1,1,0,0, 0,0,1,0,0, 0,0,1,0,0, 0,0,1,0,0, 0,0,1,0,0, 0,1,1,1,0],
  '2': [0,1,1,1,0, 1,0,0,0,1, 0,0,0,0,1, 0,0,0,1,0, 0,0,1,0,0, 0,1,0,0,0, 1,1,1,1,1],
  '3': [1,1,1,1,0, 0,0,0,0,1, 0,0,0,0,1, 0,1,1,1,0, 0,0,0,0,1, 0,0,0,0,1, 1,1,1,1,0],
  '4': [0,0,0,1,0, 0,0,1,1,0, 0,1,0,1,0, 1,0,0,1,0, 1,1,1,1,1, 0,0,0,1,0, 0,0,0,1,0],
  '5': [1,1,1,1,1, 1,0,0,0,0, 1,0,0,0,0, 1,1,1,1,0, 0,0,0,0,1, 0,0,0,0,1, 1,1,1,1,0],
  '6': [0,1,1,1,0, 1,0,0,0,0, 1,0,0,0,0, 1,1,1,1,0, 1,0,0,0,1, 1,0,0,0,1, 0,1,1,1,0],
  '7': [1,1,1,1,1, 0,0,0,0,1, 0,0,0,1,0, 0,0,1,0,0, 0,1,0,0,0, 0,1,0,0,0, 0,1,0,0,0],
  '8': [0,1,1,1,0, 1,0,0,0,1, 1,0,0,0,1, 0,1,1,1,0, 1,0,0,0,1, 1,0,0,0,1, 0,1,1,1,0],
  '9': [0,1,1,1,0, 1,0,0,0,1, 1,0,0,0,1, 0,1,1,1,1, 0,0,0,0,1, 0,0,0,0,1, 0,1,1,1,0],
  '%': [1,1,0,0,1, 1,1,0,1,0, 0,0,1,0,0, 0,1,0,0,0, 0,1,0,1,1, 1,0,0,1,1, 0,0,0,0,0],
};

export function standardize(value, feature) {
  return (value - FEATURE_STATS[feature].mean) / FEATURE_STATS[feature].std;
}

export function computeStrokeRisk(inputs) {
  const age_std     = standardize(inputs.age, 'age');
  const glucose_std = standardize(inputs.glucose, 'avg_glucose_level');
  const bmi_std     = standardize(inputs.bmi, 'bmi');

  const gender_male       = inputs.gender === 'Male' ? 1 : 0;
  const married_yes       = inputs.married ? 1 : 0;
  const residence_urban   = inputs.residence === 'Urban' ? 1 : 0;
  const work_private      = inputs.workType === 'Private' ? 1 : 0;
  const work_selfemployed = inputs.workType === 'Self-employed' ? 1 : 0;
  const work_children     = inputs.workType === 'Children' ? 1 : 0;
  const work_never        = inputs.workType === 'Never worked' ? 1 : 0;
  const smoke_former      = inputs.smoking === 'Formerly Smoked' ? 1 : 0;
  const smoke_current     = inputs.smoking === 'Smokes' ? 1 : 0;
  const smoke_never       = inputs.smoking === 'Never Smoked' ? 1 : 0;

  const C = LR_COEFFICIENTS;
  const logOdds = C.intercept
    + C.age                         * age_std
    + C.avg_glucose_level           * glucose_std
    + C.bmi                         * bmi_std
    + C.hypertension                * (inputs.hypertension ? 1 : 0)
    + C.heart_disease               * (inputs.heartDisease ? 1 : 0)
    + C.gender_Male                 * gender_male
    + C.ever_married_Yes            * married_yes
    + C.Residence_type_Urban        * residence_urban
    + C.work_type_Private           * work_private
    + C.work_type_Self_employed     * work_selfemployed
    + C.work_type_children          * work_children
    + C.work_type_Never_worked      * work_never
    + C.smoking_status_formerly_smoked * smoke_former
    + C.smoking_status_smokes          * smoke_current
    + C.smoking_status_never_smoked    * smoke_never;

  const probability = 1 / (1 + Math.exp(-logOdds));

  const contributions = [
    { feature: "Age",             value: inputs.age,                          contribution: C.age * age_std },
    { feature: "Avg Glucose",     value: inputs.glucose,                      contribution: C.avg_glucose_level * glucose_std },
    { feature: "BMI",             value: inputs.bmi,                          contribution: C.bmi * bmi_std },
    { feature: "Hypertension",    value: inputs.hypertension ? "Yes":"No",   contribution: C.hypertension * (inputs.hypertension ? 1:0) },
    { feature: "Heart Disease",   value: inputs.heartDisease ? "Yes":"No",   contribution: C.heart_disease * (inputs.heartDisease ? 1:0) },
    { feature: "Gender",          value: inputs.gender,                       contribution: C.gender_Male * gender_male },
    { feature: "Ever Married",    value: inputs.married ? "Yes":"No",        contribution: C.ever_married_Yes * married_yes },
    { feature: "Residence",       value: inputs.residence,                    contribution: C.Residence_type_Urban * residence_urban },
    { feature: "Work Type",       value: inputs.workType,                     contribution: (work_private*C.work_type_Private)+(work_selfemployed*C.work_type_Self_employed)+(work_children*C.work_type_children)+(work_never*C.work_type_Never_worked) },
    { feature: "Smoking",         value: inputs.smoking,                      contribution: (smoke_former*C.smoking_status_formerly_smoked)+(smoke_current*C.smoking_status_smokes)+(smoke_never*C.smoking_status_never_smoked) },
  ].sort((a,b) => Math.abs(b.contribution) - Math.abs(a.contribution));

  const CLINICAL_THRESHOLD = 0.28;
  const prediction = probability >= CLINICAL_THRESHOLD ? "HIGH RISK" : "LOW RISK";
  return { probability, logOdds, prediction, contributions, threshold: CLINICAL_THRESHOLD };
}
