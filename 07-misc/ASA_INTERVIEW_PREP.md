# App Subscription Analysis: the story

*Read this as the explanation you'd give if someone says "tell me about this project". It's written to be said out loud, not memorised.*

## The problem

This was an internship project (CSI summer internship, 2020). The scenario: a mobile app has a free version with basic features and a premium version that users pay for. We had data on user behaviour, and the question was: **can we predict whether a new user will buy the premium subscription?** The business value is that if we know who is unlikely to subscribe, we can target them with offers and improve enrolment.

## The data

The dataset had 50,000 users and 12 columns. Some were numeric, such as age and the number of screens visited. Some were flags, such as whether they played the minigame, used a premium feature, or liked the app. There were also date-time columns (when they first opened the app and when they enrolled), the day of week and hour, and the most interesting column, a list of every screen the user visited, stored as one long comma-separated string. The target was `enrolled`, a 0/1 value. About 62% of users had enrolled, so the classes were fairly balanced, which means accuracy is a meaningful metric here.

## What we did first: exploring

We did a proper exploratory analysis before any modelling. We found about 38% missing values, mostly in the enrolled date, which makes sense because users who never enrolled have no enrolment date. There were only 15 duplicate rows. We plotted users per day, week and hour, the age distribution, and how each behaviour column relates to enrolment. We also built a correlation matrix, and the clearest finding was that enrolment depends mostly on how many screens a user visits and which ones.

## Feature engineering, the part we spent the most time on

- **Time to enrol.** We subtracted first-open time from enrolment time to get hours taken to subscribe. Users who enrolled after more than 40 hours were reset to "not enrolled", so the model learns about users who convert quickly. The 40-hour cutoff was our own assumption.
- **The screen list.** We split the string into individual screens and used mlxtend's `TransactionEncoder` to turn it into one 0/1 column per screen. That gave us a lot of columns, so we grouped related screens (for example Loan, Loan1 to Loan4, and the Credit, Savings and product-review screens) into counts like `loan_count` and `credit_count`.
- We converted `hour` to an integer and dropped columns that would not help, such as user ID and the raw dates. We ended with about 120 numeric columns.

## Preprocessing and the split

We separated the features from the target `enrolled`, applied `StandardScaler`, and split the data into train and test sets, one third for testing. One thing I'd do differently: we fitted the scaler on the whole dataset before splitting, which leaks a little information from the test set. A cleaner way is to fit it on the training set only.

## The algorithms and why

We used two classifiers. Both are standard for a yes/no outcome.

**Logistic Regression.** We chose it because the target is binary. It takes a weighted sum of the features and passes it through a sigmoid function, so the output is a probability between 0 and 1. It is fast, easy to interpret, and a good baseline. It needs scaled features, which is why we scaled.

**Decision Tree.** It repeatedly splits the data on yes/no questions about features, picking the split that best separates enrolled from not enrolled. The measure of how mixed a node is can be Gini or entropy. Trees are easy to explain to non-technical people, and depth is the main control against overfitting. We started with a depth of 4.

Then we tuned the tree with **GridSearchCV**, trying Gini and entropy with depths from 2 to 9 using 10-fold cross-validation, scored on ROC-AUC. The best was entropy with depth 7, with a cross-validated AUC of about 0.91. ROC-AUC tells you how well the model ranks subscribers above non-subscribers.

## Results

- Logistic Regression: about 87.15% accuracy
- Decision Tree (depth 4): about 87.22%
- Tuned Decision Tree: about 87.13%

For Logistic Regression the confusion matrix showed about 7,900 correct non-enrolled and 6,650 correct enrolled predictions, with about 590 false positives and 1,550 false negatives. The honest conclusion we wrote was that neither algorithm was clearly better, and that tuning didn't improve accuracy, which suggests the data had already given most of its signal.

## If they dig deeper

- **Why scale for Logistic Regression but not trees?** Regularised linear models are sensitive to feature scale, while trees only compare thresholds.
- **What would you try next?** Random Forest or Gradient Boosting, feature importance, and precision/recall alongside accuracy.
- **Business takeaway?** Users who view more screens, particularly the finance-related ones, are more likely to subscribe, so the app can target users who show low engagement.

## Check before you say it
- The documentation lists Ankush Sharma as the sole author, and your name isn't in it. You told me you worked on this, so use "we" and describe the parts you actually did.
- The EDA notes differ slightly between the notebook (users aged 20–30 most common) and the documentation (25–35). Avoid quoting an age range unless you check.


---

## Quick terms to revise

**Core ML**
- **Machine learning:** letting a program learn patterns from data instead of writing explicit rules.
- **Supervised learning:** training on examples that already have the correct answer (users who did or didn't enrol).
- **Binary classification:** predicting one of two outcomes (enrolled = 1 or 0).
- **Feature:** an input column the model learns from.
- **Target / label:** the column we predict (`enrolled`).
- **Baseline model:** a simple first model used as a reference point.
- **Class balance:** how evenly the two outcomes are represented (about 62/38 here, fairly balanced).

**Data preparation**
- **EDA (exploratory data analysis):** looking at data with statistics and charts to understand it before modelling.
- **Missing values:** empty cells (the enrolled date was empty for users who never enrolled).
- **Correlation:** how strongly two columns move together; a correlation matrix shows this for all pairs.
- **Feature engineering:** creating new, more useful columns from raw data (time to enrol, screen counts).
- **Outlier:** an unusually extreme value; our 40-hour cutoff on time to enrol was one way of handling them.
- **One-hot / TransactionEncoder:** converts a list of items (screens) into one 0/1 column per item.
- **Feature scaling / StandardScaler:** puts features on a similar range (mean 0, std 1); matters for Logistic Regression.
- **Train-test split:** keeping part of the data unseen (one third here) to measure performance on new data.
- **Data leakage:** test-set information influencing training; fitting the scaler before splitting is a mild example.
- **Dimensionality:** the number of features; we cut it by grouping related screens into counts.

**Algorithms**
- **Logistic Regression:** a linear model that outputs the probability of class 1 through a sigmoid.
- **Sigmoid function:** squashes any number into a value between 0 and 1.
- **Regularisation (L2):** a penalty that keeps model weights small to reduce overfitting.
- **Decision Tree:** a model that asks a series of yes/no questions on features to reach a prediction.
- **Gini / entropy:** two ways of measuring how mixed a tree node is; splits aim to make nodes purer.
- **max_depth:** how deep a tree can grow; the main way to limit overfitting.
- **Overfitting / underfitting:** memorising the training data vs being too simple to learn the pattern.

**Tuning and evaluation**
- **Hyperparameter:** a setting chosen before training (such as tree depth).
- **GridSearchCV:** tries every combination of the settings you list and keeps the best, using cross-validation.
- **Cross-validation (10-fold):** splits the training data into 10 parts, trains on 9, tests on 1, and rotates.
- **Accuracy:** percentage of correct predictions.
- **Confusion matrix:** a table of correct and wrong predictions by class.
- **False positive / false negative:** predicting enrolled when they didn't, or not enrolled when they did.
- **Precision / recall / F1:** precision is how many predicted positives are right; recall is how many real positives were found; F1 balances the two.
- **ROC-AUC:** how well the model ranks positives above negatives across all thresholds; 0.5 is random, 1.0 is perfect (ours was about 0.91 in cross-validation).

**Tools**
- **pandas / numpy:** libraries for tables of data and numeric arrays.
- **matplotlib / seaborn:** plotting libraries used for the EDA graphs.
- **scikit-learn:** the Python ML library with the models, scaler, split, grid search and metrics.
- **mlxtend:** an extra ML library that supplied `TransactionEncoder`.
- **Google Colab:** a free cloud Jupyter notebook environment where the work was done.
