# ML Based Career Guidance Tool: the story

*Read this as the explanation you'd give if someone says "tell me about this project". It's written to be said out loud, not memorised.*

## What it was and why we built it

This was our B.Tech second-year project, which we built as a two-person team in 2021–22. The idea came from a common problem: many students know they have some skills but can't tell which job role suits them. So we built a web tool where a student rates their proficiency in 17 areas, for example databases, networking, cyber security, programming, AI/ML, project management, communication and graphic design. The tool then predicts the best-fit IT role and also suggests a few other roles that match their profile. There are 17 roles in total, such as Data Scientist, Database Administrator, Software Developer, Business Analyst and Cyber Security Specialist.

## The data

We had a dataset of about 9,000 records. Each record was one student profile: 17 skill-level columns and one target column, the job role. In the original data the skill levels were categories written as text, with values like "Not Interested", "Poor" and "Professional", so the first job was to turn them into numbers a model could use.

We did the usual preparation. We explored the data with charts, checked for missing values (there was hardly any) and found duplicate rows. Then we encoded the categories. We used one-hot encoding for the features and label encoding for the target role, which maps each role to a number. We also tried feature scaling with `StandardScaler`. Finally we split the data into training and test sets, roughly 70/30. The deployed training script uses `train_test_split` with a 30% test size.

## The algorithms and why

We tried two classification algorithms, **Logistic Regression** and **K-Nearest Neighbours (KNN)**. Both are simple and well understood, which suited a first ML project.

Logistic Regression is a linear model. It computes a weighted sum of the features and passes it through a sigmoid to get a probability. It is fast and easy to interpret.

KNN is the one we deployed. It doesn't really learn anything during training. It just stores the training data. When a new student comes in, it measures the distance (Euclidean) from that student's skill profile to every stored student, picks the 5 closest (we used K=5), and takes a majority vote on their job roles. So it is literally "students most similar to you ended up in these roles", and that matched our problem well.

We said KNN had useful properties for this case: it makes no assumptions about the data's shape, it handles multiple classes naturally, and it can give a probability per class. Its downsides are that prediction is slower on big data, it is sensitive to feature scaling and noise, and K has to be chosen carefully. A very small K is noisy, and a very large K blurs the classes.

## Results

Both models performed well, and our report notes accuracies of about 92.78% and 99.01%. The 99% belongs to KNN. In the interview, say plainly that this high number mostly reflects clean, well-separated data, and that duplicate rows can also push scores up. We concluded that neither algorithm is clearly better and that the result depends on the dataset.

## From model to product

We saved the trained KNN model with `pickle`. A small Flask app loads it and shows a form with 17 dropdowns, one per skill, each rated 1 to 7. On submit, Flask turns the answers into a single row and calls `predict` for the top role. It also calls `predict_proba`, which for KNN is simply the share of the 5 neighbours that belong to each role. Any role with probability above 5% is shown as an additional suggestion, so a student sees one main role plus a few alternatives.

Around this, we built the website itself with PHP, MySQL, HTML, CSS, JavaScript and Bootstrap. There is registration and login with hashed passwords stored in MySQL. There is a courses page and a blog / knowledge section. Each job role has its own page with a description and the skills needed. The Flask result page links to these.

## If they dig deeper

- **Why K=5?** It's a common default, and we didn't run a full search. The proper way is cross-validation across several values of K.
- **Why accuracy as the metric?** It was the simplest for balanced classes. For a recommender, I'd also look at precision/recall and whether the right role appears in the top few suggestions.
- **What would you improve?** Cross-validation and tuning K, removing duplicates before the split, real student data instead of a clean dataset, and merging the PHP and Flask parts into a single service.

## Check before you say it
- The accuracy sentence in the report lists Logistic Regression first and KNN second. Confirm in `Project Report.docx` that 92.78 is Logistic Regression and 99.01 is KNN.
- Be clear about which parts you personally built. The report names you and Ankush Sharma as the two authors.
- The repo's deployed code only contains KNN. The Logistic Regression comparison is described in the report.


---

## Quick terms to revise

**Core ML**
- **Machine learning:** letting a program learn patterns from data instead of writing explicit rules.
- **Supervised learning:** training on examples that already have the correct answer (here, students with known job roles).
- **Classification:** predicting a category (a job role) rather than a number.
- **Multi-class classification:** a classification problem with more than two categories (we had 17 roles).
- **Feature:** an input column the model learns from (each of the 17 skill ratings).
- **Target / label:** the output we want to predict (the job role).
- **Model:** the trained object that maps features to a prediction.
- **Training vs prediction:** training learns from known data; prediction applies the model to new data.

**Data preparation**
- **EDA (exploratory data analysis):** looking at the data with statistics and charts before modelling.
- **Missing values:** empty cells; they must be filled or removed.
- **Duplicate rows:** identical records; they can inflate accuracy if copies land in both train and test sets.
- **Categorical data:** values that are labels, not numbers (e.g. "Poor", "Professional").
- **One-hot encoding:** turns each category into its own 0/1 column so the model doesn't assume an order.
- **Label encoding:** replaces each category with an integer (we used it for the job role).
- **Feature scaling:** putting features on a similar range so none dominates; important for distance-based models like KNN.
- **StandardScaler:** a scaler that makes each feature have mean 0 and standard deviation 1.
- **Train-test split:** keeping part of the data (about 30%) unseen to check how the model performs on new data.
- **Data leakage:** test-set information sneaking into training, which makes scores look better than they really are.
- **Synthetic data:** artificially generated data rather than collected from real people.

**Algorithms**
- **KNN (K-Nearest Neighbours):** predicts by finding the K most similar training points and taking a majority vote.
- **K:** how many neighbours vote (we used 5); small K is noisy, large K blurs classes.
- **Euclidean distance:** straight-line distance between two points in feature space.
- **Lazy learner:** an algorithm that does no real learning at training time; it stores the data and works at prediction time.
- **Non-parametric:** makes no assumption about the shape of the data.
- **Logistic Regression:** a linear model that outputs a probability using a sigmoid; mostly used for yes/no problems.
- **Sigmoid function:** squashes any number into a value between 0 and 1.
- **predict vs predict_proba:** `predict` gives the final class; `predict_proba` gives a probability per class (for KNN, the share of neighbours in each class).
- **Curse of dimensionality:** with many features, distances between points become less meaningful, which hurts KNN.

**Evaluation**
- **Accuracy:** percentage of predictions that are correct.
- **Overfitting:** the model memorises training data and does poorly on new data.
- **Underfitting:** the model is too simple to capture the pattern.
- **Hyperparameter:** a setting chosen before training (such as K) rather than learned from data.
- **Cross-validation:** repeating the train/test split several ways to get a more reliable score.
- **Precision / recall / F1:** precision is how many predicted positives are right; recall is how many real positives were found; F1 balances the two.

**Tools**
- **scikit-learn:** the Python ML library with KNN, Logistic Regression, scalers and metrics.
- **pandas / numpy:** libraries for tables of data and numeric arrays.
- **pickle:** saves a trained Python object to a file so it can be reloaded without retraining.
- **Flask:** a lightweight Python web framework that served the model's predictions.
