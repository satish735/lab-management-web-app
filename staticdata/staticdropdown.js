export const BodyParts = [
    { value: "HEAD", label: "Head" },
    { value: "BRAIN", label: "Brain" },
    { value: "EYES", label: "Eyes" },
    { value: "EARS", label: "Ears" },
    { value: "NOSE", label: "Nose" },
    { value: "MOUTH", label: "Mouth" },
    { value: "THROAT", label: "Throat" },
    { value: "NECK", label: "Neck" },
    { value: "THYROID", label: "Thyroid" },
    { value: "CHEST", label: "Chest" },
    { value: "HEART", label: "Heart" },
    { value: "LUNGS", label: "Lungs" },
    { value: "ABDOMEN", label: "Abdomen" },
    { value: "LIVER", label: "Liver" },
    { value: "STOMACH", label: "Stomach" },
    { value: "PANCREAS", label: "Pancreas" },
    { value: "GALLBLADDER", label: "Gallbladder" },
    { value: "SPLEEN", label: "Spleen" },
    { value: "KIDNEYS", label: "Kidneys" },
    { value: "INTESTINES", label: "Intestines" },
    { value: "BLADDER", label: "Bladder" },
    { value: "PELVIS", label: "Pelvis" },
    { value: "SPINE", label: "Spine" },
    { value: "BACK", label: "Back" },
    { value: "ARMS", label: "Arms" },
    { value: "HANDS", label: "Hands" },
    { value: "FINGERS", label: "Fingers" },
    { value: "SHOULDERS", label: "Shoulders" },
    { value: "ELBOWS", label: "Elbows" },
    { value: "WRISTS", label: "Wrists" },
    { value: "LEGS", label: "Legs" },
    { value: "FEET", label: "Feet" },
    { value: "TOES", label: "Toes" },
    { value: "HIPS", label: "Hips" },
    { value: "KNEES", label: "Knees" },
    { value: "ANKLES", label: "Ankles" }
];

export const TestTypes = [
    { value: "Package", label: "package" },
    { value: "Test", label: "test" },

]
export const SampleTypes = [
    { value: "edta blood", label: "EDTA Blood" },
    { value: "plasma", label: "Plasma" },
    { value: "serum", label: "Serum" },
    { value: "whole blood", label: "Whole Blood" },
    { value: "urine", label: "Urine" },
    { value: "saliva", label: "Saliva" },
    { value: "cerebrospinal fluid", label: "Cerebrospinal Fluid" },
    { value: "synovial fluid", label: "Synovial Fluid" },
    { value: "pleural fluid", label: "Pleural Fluid" },
    { value: "peritoneal fluid", label: "Peritoneal Fluid" },
    { value: "amniotic fluid", label: "Amniotic Fluid" },
    { value: "semen", label: "Semen" },
    { value: "stool", label: "Stool" },
    { value: "sputum", label: "Sputum" },
    { value: "hair", label: "Hair" },
    { value: "nail", label: "Nail" },
    { value: "tissue biopsy", label: "Tissue Biopsy" },
    { value: "bone marrow", label: "Bone Marrow" },
    { value: "nasal swab", label: "Nasal Swab" },
    { value: "throat swab", label: "Throat Swab" },
    { value: "wound swab", label: "Wound Swab" }
];



export const Observations_List = [
    // Complete Blood Count (CBC/Hemogram)
    { type: "Complete Blood Count (CBC/Hemogram)", value: "hemoglobin", label: "Hemoglobin" },
    { type: "Complete Blood Count (CBC/Hemogram)", value: "haematocrit", label: "Haematocrit (HCT)" },
    { type: "Complete Blood Count (CBC/Hemogram)", value: "rbc", label: "Red Blood Cell Count (RBC)" },
    { type: "Complete Blood Count (CBC/Hemogram)", value: "mcv", label: "Mean Corpuscular Volume (MCV)" },
    { type: "Complete Blood Count (CBC/Hemogram)", value: "mch", label: "Mean Corpuscular Hemoglobin (MCH)" },
    { type: "Complete Blood Count (CBC/Hemogram)", value: "mchc", label: "Mean Corpuscular Hemoglobin Concentration (MCHC)" },
    { type: "Complete Blood Count (CBC/Hemogram)", value: "rdwcv", label: "Red Cell Distribution Width (RDWcv)" },
    { type: "Complete Blood Count (CBC/Hemogram)", value: "tlc", label: "Total Leukocyte Count (TLC)" },
    { type: "Complete Blood Count (CBC/Hemogram)", value: "segmented neutrophils", label: "Segmented Neutrophils" },
    { type: "Complete Blood Count (CBC/Hemogram)", value: "lymphocytes", label: "Lymphocytes" },
    { type: "Complete Blood Count (CBC/Hemogram)", value: "eosinophils", label: "Eosinophils" },
    { type: "Complete Blood Count (CBC/Hemogram)", value: "monocytes", label: "Monocytes" },
    { type: "Complete Blood Count (CBC/Hemogram)", value: "basophils", label: "Basophils" },
    { type: "Complete Blood Count (CBC/Hemogram)", value: "absolute leucocyte count", label: "Absolute Leukocyte Count" },
    { type: "Complete Blood Count (CBC/Hemogram)", value: "neutrophils", label: "Neutrophils" },
    { type: "Complete Blood Count (CBC/Hemogram)", value: "lymphocytes", label: "Lymphocytes" },
    { type: "Complete Blood Count (CBC/Hemogram)", value: "eosinophils", label: "Eosinophils" },
    { type: "Complete Blood Count (CBC/Hemogram)", value: "monocytes", label: "Monocytes" },
    { type: "Complete Blood Count (CBC/Hemogram)", value: "basophils", label: "Basophils" },
    { type: "Complete Blood Count (CBC/Hemogram)", value: "platelet count", label: "Platelet Count" },
    { type: "Complete Blood Count (CBC/Hemogram)", value: "mpv", label: "Mean Platelet Volume (MPV)" },

    // Erythrocyte Sedimentation Rate (ESR)
    { type: "Erythrocyte Sedimentation Rate (ESR)", value: "esr", label: "Erythrocyte Sedimentation Rate (ESR)" },

    // Urine Complete Examination
    { type: "Urine Complete Examination", value: "appearance", label: "Appearance" },
    { type: "Urine Complete Examination", value: "color", label: "Color" },
    { type: "Urine Complete Examination", value: "specific gravity", label: "Specific Gravity" },
    { type: "Urine Complete Examination", value: "ph", label: "pH" },
    { type: "Urine Complete Examination", value: "glucose", label: "Glucose" },
    { type: "Urine Complete Examination", value: "ketone", label: "Ketone" },
    { type: "Urine Complete Examination", value: "protein", label: "Protein" },
    { type: "Urine Complete Examination", value: "bilirubin", label: "Bilirubin" },
    { type: "Urine Complete Examination", value: "urobilinogen", label: "Urobilinogen" },
    { type: "Urine Complete Examination", value: "occult blood", label: "Occult Blood" },
    { type: "Urine Complete Examination", value: "nitrite", label: "Nitrite" },
    { type: "Urine Complete Examination", value: "red blood cells", label: "Red Blood Cells" },
    { type: "Urine Complete Examination", value: "white blood cells", label: "White Blood Cells (Pus Cells)" },
    { type: "Urine Complete Examination", value: "epithelial cells", label: "Epithelial Cells" },
    { type: "Urine Complete Examination", value: "calcium oxalate monohydrate crystals", label: "Calcium Oxalate Monohydrate Crystals" },
    { type: "Urine Complete Examination", value: "calcium oxalate dihydrate crystals", label: "Calcium Oxalate Dihydrate Crystals" },
    { type: "Urine Complete Examination", value: "triple phosphate crystals", label: "Triple Phosphate Crystals" },
    { type: "Urine Complete Examination", value: "uric acid crystals", label: "Uric Acid Crystals" },
    { type: "Urine Complete Examination", value: "cystine crystals", label: "Cystine Crystals" },
    { type: "Urine Complete Examination", value: "leucine crystals", label: "Leucine Crystals" },
    { type: "Urine Complete Examination", value: "tyrosine crystals", label: "Tyrosine Crystals" },
    { type: "Urine Complete Examination", value: "amorphous crystals - urate", label: "Amorphous Crystals - Urate" },
    { type: "Urine Complete Examination", value: "amorphous crystals - phosphate", label: "Amorphous Crystals - Phosphate" },
    { type: "Urine Complete Examination", value: "hyalin casts", label: "Hyalin Casts" },
    { type: "Urine Complete Examination", value: "pathological casts", label: "Pathological Casts" },
    { type: "Urine Complete Examination", value: "hyalin-granular casts", label: "Hyalin-Granular Casts" },
    { type: "Urine Complete Examination", value: "granular casts", label: "Granular Casts" },
    { type: "Urine Complete Examination", value: "rbc casts", label: "RBC Casts" },
    { type: "Urine Complete Examination", value: "wbc casts", label: "WBC Casts" },
    { type: "Urine Complete Examination", value: "fatty casts", label: "Fatty Casts" },
    { type: "Urine Complete Examination", value: "waxy casts", label: "Waxy Casts" },
    { type: "Urine Complete Examination", value: "yeast cell", label: "Yeast Cell" },
    { type: "Urine Complete Examination", value: "spermatozoa", label: "Spermatozoa" },
    { type: "Urine Complete Examination", value: "other", label: "Other" },

    // Glucose (Fasting)
    { type: "Glucose (Fasting)", value: "glucose fasting", label: "Glucose (Fasting)" },

    // Glycated Hemoglobin A1c (HbA1c)
    { type: "Glycated Hemoglobin A1c (HbA1c)", value: "hba1c", label: "Hemoglobin A1c (%)" },

    // Lipid Profile
    { type: "Lipid Profile", value: "total cholesterol", label: "Total Cholesterol" },
    { type: "Lipid Profile", value: "hdl cholesterol", label: "HDL Cholesterol" },
    { type: "Lipid Profile", value: "ldl cholesterol", label: "LDL Cholesterol" },
    { type: "Lipid Profile", value: "triglyceride", label: "Triglyceride" },
    { type: "Lipid Profile", value: "non hdl cholesterol", label: "Non HDL Cholesterol" },
    { type: "Lipid Profile", value: "cholesterol hdl ratio", label: "Cholesterol : HDL Ratio" },

    // Liver Function Test (LFT)
    { type: "Liver Function Test (LFT)", value: "sgot", label: "S.G.O.T. / AST" },
    { type: "Liver Function Test (LFT)", value: "sgpt", label: "S.G.P.T. / ALT" },
    { type: "Liver Function Test (LFT)", value: "alkaline phosphatase", label: "Alkaline Phosphatase" },
    { type: "Liver Function Test (LFT)", value: "bilirubin total", label: "Bilirubin Total" },
    { type: "Liver Function Test (LFT)", value: "bilirubin direct", label: "Bilirubin Direct" },
    { type: "Liver Function Test (LFT)", value: "bilirubin indirect", label: "Indirect Bilirubin" },
    { type: "Liver Function Test (LFT)", value: "total protein", label: "Total Protein" },
    { type: "Liver Function Test (LFT)", value: "albumin", label: "Albumin" },
    { type: "Liver Function Test (LFT)", value: "globulin", label: "Globulin" },
    { type: "Liver Function Test (LFT)", value: "ag ratio", label: "A/G Ratio" },
    { type: "Liver Function Test (LFT)", value: "gamma gt", label: "Gamma Glutamyl Transferase" },

    // Kidney Function Test (KFT)
    { type: "Kidney Function Test (KFT)", value: "creatinine", label: "Creatinine" },
    { type: "Kidney Function Test (KFT)", value: "creatinine egfr", label: "Creatinine eGFR" },
    { type: "Kidney Function Test (KFT)", value: "urea", label: "Urea" },
    { type: "Kidney Function Test (KFT)", value: "uric acid", label: "Uric Acid" },
    { type: "Kidney Function Test (KFT)", value: "sodium", label: "Sodium" },
    { type: "Kidney Function Test (KFT)", value: "potassium", label: "Potassium" },
    { type: "Kidney Function Test (KFT)", value: "chloride", label: "Chloride" },

    // Iron Profile
    { type: "Iron Profile", value: "iron", label: "Iron" },
    { type: "Iron Profile", value: "total iron binding capacity", label: "Total Iron Binding Capacity" },
    { type: "Iron Profile", value: "transferrin saturation", label: "Transferrin Saturation" },
    { type: "Iron Profile", value: "ferritin", label: "Ferritin" },

    // Vitamin B12
    { type: "Vitamin B12", value: "vitamin b12", label: "Vitamin B12" },

    // Vitamin D (25 Hydroxy Vit D)
    { type: "Vitamin D (25 Hydroxy Vit D)", value: "vitamin d3", label: "25-Hydroxy Vitamin D3" },

    // Calcium
    { type: "Calcium", value: "calcium", label: "Calcium" },

    // Phosphorus
    { type: "Phosphorus", value: "phosphorus", label: "Phosphorus" },

    // Magnesium
    { type: "Magnesium", value: "magnesium", label: "Magnesium" },

    // Lactate Dehydrogenase (LDH)
    { type: "Lactate Dehydrogenase (LDH)", value: "ldh", label: "LDH" },

    // Lipoprotein (A)
    { type: "Lipoprotein (A)", value: "lipoprotein a", label: "Lipoprotein (A)" },

    // Apolipoprotein B/A1 Ratio
    { type: "Apolipoprotein B/A1 Ratio", value: "apolipoprotein b", label: "Apolipoprotein B" },
    { type: "Apolipoprotein B/A1 Ratio", value: "apolipoprotein a1", label: "Apolipoprotein A1" },
    { type: "Apolipoprotein B/A1 Ratio", value: "apolipoprotein b/a1 ratio", label: "Apolipoprotein B/A1 Ratio" },

    // High Sensitivity Troponin I (Heart Secure Test)
    { type: "High Sensitivity Troponin I (Heart Secure Test)", value: "high sensitivity troponin i", label: "High Sensitivity Troponin I" },

    // Prostate Specific Antigen (PSA)
    { type: "Prostate Specific Antigen (PSA)", value: "psa", label: "Prostate Specific Antigen (PSA)" },

    // High Sensitivity CRP (hS CRP)
    { type: "High Sensitivity CRP (hS CRP)", value: "hs crp", label: "High Sensitivity CRP (hS CRP)" },

    // Free Thyroid Profile
    { type: "Free Thyroid Profile", value: "free t3", label: "Free T3" },
    { type: "Free Thyroid Profile", value: "free t4", label: "Free T4" },
    { type: "Free Thyroid Profile", value: "tsh", label: "TSH" },

    // Microalbumin (Spot Urine)
    { type: "Microalbumin (Spot Urine)", value: "microalbumin", label: "Microalbumin" },
    { type: "Microalbumin (Spot Urine)", value: "urinary creatinine", label: "Urinary Creatinine" },
    { type: "Microalbumin (Spot Urine)", value: "albumin/creatinine ratio", label: "Albumin / Creatinine Ratio" }
];


export const medicalTests = [
    { label: "Complete Blood Count (CBC/Hemogram)", value: "cbc_hemogram" },
    { label: "Glucose (Random)", value: "glucose_random" },
    { label: "Glucose (Fasting)", value: "glucose_fasting" },
    { label: "Erythrocytes Sedimentation Rate (ESR)", value: "esr" },
    { label: "Creatinine", value: "creatinine" },
    { label: "SGPT (ALT)", value: "sgpt_alt" },
    { label: "LFT - Liver Function Test", value: "lft_liver_function_test" },
    { label: "Glycated Hemoglobin A1c (HbA1c)", value: "glycated_hemoglobin_a1c" },
    { label: "TSH 3rd Gen - Thyroid Stimulating Hormone", value: "tsh_3rd_gen" },
    { label: "Lipid Profile", value: "lipid_profile" },
    { label: "SGOT (AST)", value: "sgot_ast" },
    { label: "Thyroid Profile", value: "thyroid_profile" },
    { label: "Urine Complete Examination Automation", value: "urine_complete_examination_automation" },
    { label: "KFT - Kidney Function Test", value: "kft_kidney_function_test" },
    { label: "Glucose (Post Prandial 2 Hrs.)", value: "glucose_post_prandial_2hrs" },
    { label: "Vitamin B12 (Cyanocobalamin)", value: "vitamin_b12" },
    { label: "Vitamin D (25 Hydroxy Vit D)", value: "vitamin_d" },
    { label: "Urine Complete Examination", value: "urine_complete_examination" },
    { label: "CRP (Quantitative)", value: "crp_quantitative" },
    { label: "Calcium", value: "calcium" },
    { label: "ABO & RH Typing (Blood Group) by Column Agglutination", value: "abo_rh_typing" },
    // Additional tests
    { label: "Hemoglobin A1c (HbA1c)", value: "hemoglobin_a1c" },
    { label: "Vitamin D3", value: "vitamin_d3" },
    { label: "Lactate Dehydrogenase (LDH)", value: "ldh" },
    { label: "Bilirubin Total/Direct/Indirect", value: "bilirubin_total_direct_indirect" },
    { label: "Protein Total/Albumin/Globulin", value: "protein_total_albumin_globulin" },
    { label: "Prostate-Specific Antigen (PSA)", value: "psa" },
    { label: "Folate (Vitamin B9)", value: "folate" },
    { label: "Magnesium", value: "magnesium" },
    { label: "Sodium", value: "sodium" },
    { label: "Potassium", value: "potassium" },
    { label: "Uric Acid", value: "uric_acid" },
    { label: "Amylase", value: "amylase" },
    { label: "Lipase", value: "lipase" },
    // Expanded tests
    { label: "C-Reactive Protein (CRP)", value: "c_reactive_protein" },
    { label: "Hepatitis B Surface Antigen (HBsAg)", value: "hbsag" },
    { label: "Hepatitis C Antibody (Anti-HCV)", value: "anti_hcv" },
    { label: "HIV Antibody Test", value: "hiv_antibody" },
    { label: "Syphilis Test (RPR/VDRL)", value: "syphilis_test" },
    { label: "Cholesterol Total", value: "cholesterol_total" },
    { label: "High-Density Lipoprotein (HDL) Cholesterol", value: "hdl_cholesterol" },
    { label: "Low-Density Lipoprotein (LDL) Cholesterol", value: "ldl_cholesterol" },
    { label: "Triglycerides", value: "triglycerides" },
    { label: "Thyroxine (T4) Total", value: "thyroxine_total_t4" },
    { label: "Free Thyroxine (FT4)", value: "free_thyroxine_ft4" },
    { label: "Triiodothyronine (T3) Total", value: "triiodothyronine_total_t3" },
    { label: "Free Triiodothyronine (FT3)", value: "free_triiodothyronine_ft3" },
    { label: "Anti-Thyroid Peroxidase (Anti-TPO)", value: "anti_tpo" },
    { label: "Anti-Thyroglobulin (Anti-TG)", value: "anti_tg" },
    { label: "Ferritin", value: "ferritin" },
    { label: "Transferrin", value: "transferrin" },
    { label: "Haptoglobin", value: "haptoglobin" },
    { label: "Alpha-1 Antitrypsin", value: "alpha_1_antitrypsin" },
    { label: "Reticulocyte Count", value: "reticulocyte_count" },
    { label: "B-type Natriuretic Peptide (BNP)", value: "bnp" },
    { label: "Brain Natriuretic Peptide (BNP)", value: "brain_natriuretic_peptide" }
];




export const medicalDegrees = [
    { label: "Doctor of Medicine", value: "md" },
    { label: "Doctor of Osteopathic Medicine", value: "do" },
    { label: "Bachelor of Medicine, Bachelor of Surgery", value: "mbbs" },
    { label: "Doctor of Dental Surgery", value: "dds" },
    { label: "Doctor of Dental Medicine", value: "dmd" },
    { label: "Bachelor of Dental Surgery", value: "bds" },
    { label: "Master of Surgery", value: "ms" },
    { label: "Master of Medicine", value: "mm" },
    { label: "Doctor of Podiatric Medicine", value: "dpm" },
    { label: "Doctor of Veterinary Medicine", value: "dvm" },
    { label: "Bachelor of Science in Nursing", value: "bsn" },
    { label: "Master of Science in Nursing", value: "msn" },
    { label: "Doctor of Nursing Practice", value: "dnp" },
    { label: "Doctor of Pharmacy", value: "pharmd" },
    { label: "Bachelor of Pharmacy", value: "bpharm" },
    { label: "Master of Public Health", value: "mph" },
    { label: "Master of Health Administration", value: "mha" },
    { label: "Doctor of Physical Therapy", value: "dpt" },
    { label: "Bachelor of Physical Therapy", value: "bpt" },
    { label: "Master of Science in Clinical Research", value: "mscr" },
    { label: "Master of Science in Biomedical Science", value: "msbs" },
    { label: "Doctor of Philosophy in Biomedical Science", value: "phd_bs" },
    { label: "Doctor of Public Health", value: "drph" },
    { label: "Master of Science in Nutrition", value: "msn" },
    { label: "Doctor of Chiropractic", value: "dc" }
];


export const medicalDepartments = [
    { label: "Cardiology", value: "cardiology" },
    { label: "Dermatology", value: "dermatology" },
    { label: "Emergency Medicine", value: "emergency_medicine" },
    { label: "Endocrinology", value: "endocrinology" },
    { label: "Gastroenterology", value: "gastroenterology" },
    { label: "General Surgery", value: "general_surgery" },
    { label: "Hematology", value: "hematology" },
    { label: "Infectious Disease", value: "infectious_disease" },
    { label: "Internal Medicine", value: "internal_medicine" },
    { label: "Nephrology", value: "nephrology" },
    { label: "Neurology", value: "neurology" },
    { label: "Neurosurgery", value: "neurosurgery" },
    { label: "Obstetrics and Gynecology", value: "obstetrics_gynecology" },
    { label: "Oncology", value: "oncology" },
    { label: "Ophthalmology", value: "ophthalmology" },
    { label: "Orthopedics", value: "orthopedics" },
    { label: "Otolaryngology", value: "otolaryngology" },
    { label: "Pediatrics", value: "pediatrics" },
    { label: "Plastic Surgery", value: "plastic_surgery" },
    { label: "Psychiatry", value: "psychiatry" },
    { label: "Pulmonology", value: "pulmonology" },
    { label: "Radiology", value: "radiology" },
    { label: "Rheumatology", value: "rheumatology" },
    { label: "Urology", value: "urology" },
    { label: "Anesthesiology", value: "anesthesiology" },
    { label: "Pathology", value: "pathology" },
    { label: "Geriatrics", value: "geriatrics" },
    { label: "Immunology", value: "immunology" },
    { label: "Physical Medicine and Rehabilitation", value: "physical_medicine_rehabilitation" },
    { label: "Palliative Care", value: "palliative_care" },
    { label: "Sports Medicine", value: "sports_medicine" }
];
