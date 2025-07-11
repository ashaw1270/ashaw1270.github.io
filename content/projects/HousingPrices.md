---
date: '2025-05-07'
title: 'When Less is More: Evaluating Simplicity vs. Complexity in House Price Prediction'
paper: '/house_prices_paper.pdf'
code: 'https://github.com/ashaw1270/housing-prices'
showInProjects: true
---

Predicting house prices accurately is essential for buyers and sellers alike. This research explores the effectiveness of various machine learning algorithms—including multiple linear regression, support vector regression, ridge and lasso regularization, and XGBoost—in predicting house prices based on property features. Our analysis utilized a dataset from Kaggle, which was made up of 545 houses from the Boston metropolitan area, each described by 13 unique features. To address the high feature-to-sample-size ratio and reduce model variability observed in initial trials, we relied on a 5-fold cross-validation throughout the study, providing a more consistent and reliable estimate of model performance. Despite experimenting with complex models, our results show that standard linear regression demonstrates comparable performance with an R2 score of approximately 0.68, making it a robust and interpretable choice for this dataset.
