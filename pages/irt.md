---
layout: default
title: IRT
---

<style>
    body {
        background-color: #FAF7F6;
    }
</style>

# Item Response Theory

## Table of Contents
1. [Glossary](#glossary)
2. [Models](#models)
3. [Optimization](#optimization)
4. [Scale-Linking](#scale-linking)

[Citations](#citations)

Item Response Theory explains the relationship between an individual's ability and their observed performance [(Columbia University Mailman School of Public Health, n.d.)](https://www.publichealth.columbia.edu/research/population-health-methods/item-response-theory). Formally, the probability of correctly answering an item is function of the person's ability and visualized as the item response curve.

A person's "ability" and an item's parameters are organized on an unobservable continuum (Columbia University Mailman School of Public Health, n.d.). The main purpose of IRT is to establish an individual's position on that continuum [(Columbia University Mailman School of Public Health, n.d.)](https://www.publichealth.columbia.edu/research/population-health-methods/item-response-theory). 

## Glossary

| Term              | Definition                            |
|-------------------|---------------------------------------|
| $i$               | subject $i$                           |
| $j$               | item $j$                              |
| $N$               | number of subjects |
| $M$               | number of items    |
| $a_j$             | (item) discrimination parameter       |
| $b_j$             | (item) difficulty parameter           |
| $c_j$             | (item) guessing parameter; the chance of a correct response for a very low $\theta$|
| $d_j$             | probability of endorsing an (item) incorrect answer in spite of high ability |
| $D=1.7$           | scaling constant                      |
| $\theta_i$        | (subject) ability. Formally cited as $\theta \in (-\infty, \infty)$, it more often is the case $\theta \in [-3, +3]$. An estimated ability of 1.2 can be interpreted as 1.2 standard deviations above the average ability in the population. |
| $\mathbf{r}_{ij}$ | response from subject $i$ to item $j$ |

## Assumptions

1. **Monotonicity**: As the trait level "increases," the probability of a correct response increases.
2. **Unidimensionality**: There is one dominant latent trait being measured and this trait is the driving force for the responses observed for each item in the measure.
3. **Local independence**: Responses given to separate items in a test are mutually independent given a certain level of ability.
4. **Invariance**: We can estimate item parameters fro any position on the item response curve.

## Models
### Unidimensional, Dichotomous

| Parameter | Formula |
|-----------|---------|
| 1PL       | $\mathbb{P}[\mathbf{r}_{ij}=1 \| \theta_i, b_j] = \frac{\exp(D(\theta-b_j))}{1+\exp(Da(\theta-b_j))} = \frac{1}{1+\exp[-Da(\theta_i-b_j)]}$ |
| 2PL       | $\mathbb{P}[\mathbf{r}_{ij}=1 \| \theta_i, a_j, b_j] = \frac{\exp(\theta_i-b_j)}{1+\exp[a_j(\theta_i-b_j)]} = \frac{1}{1+\exp[-Da_j(\theta_i-b_j)]}$ |
| 3PL       | $\mathbb{P}[\mathbf{r}_{ij}=1 \| \theta_i, a_j, b_j, c_j] = c_j + (1-c_j)\frac{1}{1+\exp[-Da_j(\theta_i-b_j)]}$ |
| 4PL       | $\mathbb{P}[\mathbf{r}_{ij}=1 \| \theta_i, a_j, b_j, c_j, d_j] = c_j + (d_j-c_j)\frac{1}{1+\exp[-Da_j(\theta_i-b_j)]}$ |

## Optimization

**Maximum likelihood estimation** picks the most likely ability and item parameters given the observed responses. Subject and item parameters $\theta_i, a_j, b_j, c_j, d_j$ are optimized with gradient descent. While MLE is simple to understand and implement, it lacks any measure of uncertainty and can have important consequences when responses are missing.

$$ \mathcal{L}_{\text{MLE}} = \max_{\{\theta_i\}_{i=1}^N, \{a_i, b_j, c_j, d_j\}_{j=1}^M} \sum_{i=1}^N \sum_{j=1}^M \log \mathbb{P}(\mathbf{r}_{ij}|\theta_i, a_j, b_j, c_j, d_j) $$

$$ \theta_{i} \leftarrow \theta_i + \eta \frac{\partial\mathcal{L}_{\text{MLE}}}{\partial\theta_i}$$

$$ a_j \leftarrow a_j + \eta\frac{\partial \mathcal{L}_{\text{MLE}}}{\partial a_j}, b_j \leftarrow b_j + \dots, c_j \leftarrow c_j + \dots, d_j \leftarrow d_j + \dots $$

**Expectation-Maximization**

**Hamiltonian Monte-Carlo**

[Wu et al. (2020)](https://web.stanford.edu/~cpiech/bio/papers/variationalItemResponseTheory.pdf) proposed **VIBO**, a **variational inference** method for fitting IRT models to large datasets. The authors made the assumptions listed below

Assume:

$\theta_i \in \mathbb{R}^{K} : \mathbb{P}[\theta_i] = \prod_{k=1}^K \mathbb{P}[\theta_{i,k}]$ where $\mathbb{P}[\theta_{i,k}] \sim \mathcal{N}(0,1)$

$\mathbb{P}[\\{a_j, b_j, c_j, d_j\\}_{j=1:M}] = \prod\_{j=1}^M \mathbb{P}[\{a_j, b_j, c_j, d_j\}]$ where $\mathbb{P}[\{a_j, b_j, c_j, d_j\}] \sim \mathcal{N}(0,1)$

$q_\phi(\\{a_j,b_j,c_j,d_j\\}_{j=1:M} \| \mathbf{r}\_{i,1:M}) = q\_\phi(\\{a_j,b_j,c_j,d_j \\}\_{j=1:M}) = \prod\_{j=1}^M q\_\phi(\\{a_j,b_j,c_j,d_j \\}\_{j=1:M})$

The goal of VIBO is to pick a family of distribution that "best approximates the true posterior by minizing an estimate of mismatch between true and approximate distributions." Observed variable $x \in \mathcal{X}$ represents responses from a single student $\mathbf{r}_i$ and latent variables $z \in \mathbf{\mathcal{Z}}$ represents ability and item characteristics $\theta_i, \\{a_j,b_j,c_j,d_j\\}\_{j=1:M}$.

$$q_{\psi^*(x)}(z)=\arg\min_{q_{\psi(x)}} D_{\text{KL}}\big(q_{\psi(x)}(z),|,p(z|x)\big)=\arg\max_{\psi(x)}\mathbb{E}{q_{\psi(x)}(z)}\left[\log\frac{p(x,z)}{q_{\psi(x)}(z)}\right]$$

<p style="text-align: center;"><i>by definition: minimixing the KL-divergence to the log posterior is eqivalent to maximizing the ELBO</i></p>

Let $\mathbb{P}_D(x)$ be an empirical distribution over the observed variables. The average quality of the variational approximations is 

$$ \mathbb{E}_{\mathbb{P}_D(x)}\left[\max_{\psi(x)} \mathbb{E}_{q_{\psi(x)}(z)}\left[\frac{\mathbb{P}[x,z]}{q_{\psi(x)}(z)}\right]\right] $$

Learning an approximate posterior for each $x \in D$ can grow to be unweildy in a large dataset. [Wu et al. (2020)](https://web.stanford.edu/~cpiech/bio/papers/variationalItemResponseTheory.pdf) proposed an amortized function $f_\phi$ (parameterimized by $\phi$) that maps a person's responses directly to parameters of their approximate posterior distribution. The number of parameters in amortization is vastly smaller than learning a per-observation posterior.

$$ \max_\phi \mathbb{E}_{\mathbb{P}_D(x)}\left[\mathbb{E}_{q_\phi(z|x)}\left[\log \frac{\mathbb{P}[x,z]}{q_\phi(z|x)}\right]\right] $$

[Wu et al. (2020)](https://web.stanford.edu/~cpiech/bio/papers/variationalItemResponseTheory.pdf) proved that VIBO is a lower bound on the log marginal probability of person $i$'s response. 

$$
\begin{flalign}
\log \mathbb{P}_\theta[\mathbf{r}_{i,1:M}] \ge \text{VIBO} &\triangleq \mathcal{L}_{\text{recon}} + \mathbb{E}_{q_\phi(\{a_j,b_j,c_j,d_j\}_{j=1:M}|\mathbf{r}_{i,1:M})}[D_{\text{ability}}] + D_{\text{item}} \\
\mathcal{L}_{\text{recon}} &= \mathbb{E}_{q_\phi(\theta_i, \{a_j, b_j, c_j, d_j\}_{j=1:M}|\mathbf{r}_{i,1:M})}\left[\log \mathbb{P}_\theta[\mathbf{r}_{i,1:M}|\theta_i, \{a_j, b_j, c_j, d_j\}_{j=1:M}]\right] \\
D_{\text{ability}} &= D_{\text{KL}}\left(q_\phi(\theta_i|\{a_j,b_j,c_j,d_j\}_{j=1:M}, \mathbf{r}_{i,1:M})\|\mathbb{P}[\theta_i]\right)\\
D_{\text{item}} &= D_{\text{KL}}(q_\phi(\{a_j,b_j,c_j,d_j\}_{j=1:M}|\mathbf{r}_{i,1:M})\|\mathbb{P}[\{a_j,b_j,c_j,d_j\}_{j=1:M}])\\
\end{flalign}
$$

and estimated the gradients with respect to $\theta$ and $\phi$.

$$
\begin{flalign}
\nabla_\theta\text{VIBO} &= \nabla_\theta\mathcal{L}_{\text{recon}} \\
&= \mathbb{E}_{q_\phi(\theta_i, \{a_j,b_j,c_j,d_j\}_{j=1:M})}[\nabla_\theta\log\mathbb{P}_\theta[\mathbf{r}_{i,1:M}|\theta_i, \{a_j,b_j,c_j,d_j\}_{j=1:M}]] \\
\nabla_\phi\text{VIBO} &= \nabla_\phi \mathbb{E}_{q_\phi(\{a_j,b_j,c_j,d_j\}_{j=1:M}|\mathbf{r}_{i,1:M})}[D_\text{ability}] + \nabla_\phi D_{\text{item}} \\
&= \nabla_\phi\mathbb{E}_{q_\phi(\theta_i, \{a_j,b_j,c_j,d_j\}_{j=1:M})} \left[\frac{\mathbb{P}[\theta_i]\mathbb{P}[\{a_j,b_j,c_j,d_j\}_{j=1:M}]}{q_\theta(\theta_i, \{a_j,b_j,c_j,d_j\}_{j=1:M}|\mathbf{r}_{i,1:M})}\right] \\
\end{flalign}
$$

## Scale Linking

*The summary below is pulled directly from [Kim and Lee (2004)](https://www.act.org/content/dam/act/unsecured/documents/ACT_RR2004-5.pdf) unless otherwise stated. The paper extends linkage methods to mixed-format tests (e.g. multiple choice or short essay questions). The documentation below has been modified to account for only dichotomous tests.* **[Kim and Lee (2004)](https://www.act.org/content/dam/act/unsecured/documents/ACT_RR2004-5.pdf) found that characteristic curve method yield more linking results than moment methods.**

| Term | Definition |
| ---- | ---------- |
| $A, B$ | (scale) linking coefficients slope and intercept, respectively |
|$\Psi(\theta_{\texttt{old}}), \Psi(\theta_N)$ | continuous distributions of $\theta_{\texttt{old}}$ and $\theta_N$ respectively |
| $\hat T(\cdot)$ | test characteristic function (an aggregation of item characteristic curves) |

### Motivation

Consider a situation in which two populations of examinee: $\texttt{old}$ and $\texttt{new}$, take a "test," and their response data is later trained to train two separate IRT models. The two "scales" or abilities predicted from these models are **group-dependent** and are not expected to be equivalent unless the ability distributions have the same mean and standard deviations. 

$$
\begin{flalign}
\theta_{\texttt{old}} &= A\theta_{\texttt{new}} + B && \text{$\theta_{\texttt{old}}$ and $\theta_{\texttt{new}}$ are group dependent but should be linearly related because of invariance assumption (Lord, 1980)}\\
a_{j, \texttt{old}} &= a_{jN} / A && \text{$j$th item discrimination parameter on old $\theta_{\texttt{old}}$ and new scale $\theta_{\texttt{new}}$} \\
b_{j, \texttt{old}} &= Ab_{j, \texttt{new}} + B \\
c_{j, \texttt{old}} &= c_{jN} && \text{$c_j, d_j$ are independent of ability $\theta$ and are not affected by the linear transformation}\\
d_{j, \texttt{old}} &= d_{j, \texttt{new}} \\
\end{flalign}
$$

### Moment Methods
**Mean/mean method**
$$
\begin{flalign}
A_{\texttt{mean/mean}} &= \frac{\texttt{mean}(\hat a_{\texttt{new}})}{\texttt{mean}(\hat a_\texttt{old})} \\
B_{\texttt{mean/mean}} &= \texttt{mean}(b_\texttt{old}) - A_{\texttt{mean/mean}}\texttt{mean}(\hat b_{\texttt{new}})
\end{flalign}
$$

**Mean/sigma method**
$$
\begin{flalign}
A_{\texttt{mean/sigma}} &= \frac{\texttt{standard_deviation}(\hat b_{\texttt{old}})}{\texttt{standard_deviation}(\hat b_{\texttt{new}})} \\
B_{\texttt{mean/sigma}} &= \texttt{mean}(\hat b_{\texttt{old}}) - A_{\texttt{mean/sigma}} \texttt{mean}(\hat b_{\texttt{new}})
\end{flalign}
$$

### Characteristic Curve Methods

To develop characteristic curve methods, the item characteristic curve or a test characteristic curve on the new (ability) scale is transformed with its "counterpart" on the old scale, and vice versa. This transformation requires item parameter estimates on one scale to be expressed as those transformed to the other; two ways of transformation &mdash;new-to-old and old-to-new&mdash;are conducted.

Such transformations vary by IRT model; item parameter estimate transformations for 3PL models are as follows

$$
\begin{flalign}
    \texttt{new}\rightarrow\texttt{old} &: \hat a^*_{j,\texttt{new}} = \hat a_{j, \texttt{new}} / A \hspace{5em} \hat b_{j, \texttt{new}} = A\hat b_{j, \texttt{new}} + B \\
    \texttt{old}\rightarrow\texttt{new} &:  \hat a^{\#}_{j, \texttt{old}} = A\hat a_{j, \texttt{old}} \hspace{5.5em} \hat b^{\#}_{j, \texttt{old}} = (\hat b_{j, \texttt{old}} - B)/A
\end{flalign}
$$

[Robitzsch (2024)](https://www.mdpi.com/2571-8800/7/3/21) explored asymptotic bias[^1] of the Haebara and Stocking-Lord linking methods for the 2PL IRT model. **The Stocking-Lord linking method had substantial advantages over Haebara linking** in the presence of differential item functioning[^2].

**Haebara method**

**Stocking-Lord method**: The criterion function $F$ has been defined to be non-symmetric so that only the target scale (i.e. $\theta_{\texttt{old}}$ in the case of new-to-old transformations) is taken into account. It may be desirable that the transformed scale (i.e. $\theta_{\texttt{new}}$ in the case of new-to-old transformation) also be taken into account, making $F$ symmetric.

| Formulation     | Approximation                 |
| --------------- | ----------------------------- |
| $F = F_1 + F_2$ | $F \cong F^* = F_1^* + F_2^*$ |
| $F_1 = \int_{-\infty}^{+\infty} \left[\hat T(\theta_{\texttt{old}}) - \hat T^*(\theta_{\texttt{old}})\right]^2 \Psi_1(\theta_{\texttt{old}}) d\theta_{\texttt{old}}$ | $F_1^* = \frac{1}{L^*} \sum_{i=1}^{N_{\texttt{old}}} \left[ \hat T(\theta_{i,\texttt{old}}) - \hat T^{\ast}(\theta_{i, \texttt{old}}) \right]^2 W_1(\theta_{i, \texttt{old}})$ |
| $F_2 = \left[ \hat T(\theta_{\texttt{new}}) - \hat T^{\\#}(\theta_{\texttt{new}}) \right]^2 \psi_2(\theta_{\texttt{new}})d\theta_{\texttt{new}}$ | $F_2^* = \frac{1}{L_2^*} \sum_{i=1}^{N_{\texttt{new}}}\left[\hat T(\theta_{i, \texttt{new}} - \hat T^{\\#}(\theta_{i, \texttt{new}}))\right]^2 W_2(\theta_{i, \texttt{new}})$ |

$$
\begin{flalign}
    \hat T(\theta_{\texttt{old}}) &= \sum_{i=1}^{N_{\texttt{old}}} \sum_{j=1}^M \hat {\mathbb{P}}_{i, \texttt{old}(i)}[\theta_{\texttt{old}}], \hspace{5em} \hat T^{*}(\theta_{\texttt{old}}) = \sum_{i=1}^{N_{\texttt{old}}} \sum_{j=1}^M \hat {\mathbb{P}}_{i, \texttt{old}(i)}[\theta_{\texttt{old}}] \\
    \hat T(\theta_{\texttt{new}}) &= \sum_{i=1}^{N_{\texttt{new}}}\sum_{j=1}^M \hat P_{i, \texttt{new}(i)}[\theta_{\texttt{new}}], \hspace{5em} \hat{T}^{\#}(\theta_{\texttt{new}}) = \sum_{i=1}^{N_{\texttt{new}}} \sum_{j=1}^M \hat{\mathbb{P}}_{j, \texttt{new}(i)}(\theta_{\texttt{new}})
\end{flalign}
$$

## Citations

Columbia University Mailman School of Public Health. (n.d.) [Differential Item Functioning](https://www.publichealth.columbia.edu/research/population-health-methods/differential-item-functioning)

Columbia University Mailman School of Public Health. (n.d.). [Item Response Theory](https://www.publichealth.columbia.edu/research/population-health-methods/item-response-theory).

Lord (1980) Applications of item response theory to practical testing problems.

Kim and Lee (2004). [IRT Scale Linking Methods for Mixed-Format Tests](https://www.act.org/content/dam/act/unsecured/documents/ACT_RR2004-5.pdf)

Robitzsch (2024). [Bias-reduced Haebara and Stocking-Lord Linking in the Presence of Differential Item Functioning](https://www.mdpi.com/2571-8800/7/3/21)

Wu et al (2020). [Variational Item Response Theory: Fast, Accurate, and Expressive](https://web.stanford.edu/~cpiech/bio/papers/variationalItemResponseTheory.pdf)

***
[^1]: Asymptotic bias refers to the error between an expected statistical estimate and the true population value when the sample size grows infinitely large. 
[^2]: Differential item functioning occurs when groups (such as defined by gender, ethnicity, age, or education) with the same overall ability have a different chance of answering a test question correctly [(Columbia University Mailman School of Public Health. n.d.)](https://www.publichealth.columbia.edu/research/population-health-methods/differential-item-functioning)
