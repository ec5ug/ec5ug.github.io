---
layout: default
title: Hypothesis Testing
---

# Hypothesis Testing

## Likelihood Ratio Test (Wilks Test)
The likelihood ratio test compares the goodness of fit of two competing statistical models based on the ratio of the (statistical models') likelihoods. Specifically, the likelihood ratio tests tests whether this ratio is significantly smaller than 1, or equivalently whether its natural logarithm is significantly greater than 0.

Typically, one statistical model is found by maximization over the entire parameter space $\Theta$ and another is found after imposing some constraint and contains parameter $\theta$. If the more constrained model is supported by the observed data, the two likelihoods should not differ by more than sampling error.

$$
\begin{flalign}
    H_0 &: \theta \in \Theta_0 \subseteq \Theta \\
    H_A &: \theta \in \Theta \backslash \Theta_0
\end{flalign}
$$

$$
\lambda_{\text{LR}} = -2 \ln \left[\frac{\sup_{\theta \in \Theta_0} \mathcal{L}(\theta)}{\sup_{\theta \in \Theta} \mathcal{L}(\theta)}\right] = -2\left[\ln\left[\sup_{\theta\in\Theta_0} \mathcal{L}(\theta)\right] - \ln\left[\sup_{\theta\in\Theta} \mathcal{L}(\theta)\right]\right]
$$

Assuming
* $H_0$ is true
* the sample $n$ approaches $\infty$
* the null hypothesis lies strictly within the interior of the parameter space

the test statistic $\lambda_{\text{LR}}$ will be asymptotically chi-squared distributed $\mathcal{X}^2$ with degrees of freedom equal to the difference in dimensionality of $Theta$ and $\Theta_0$. 

## Citations


