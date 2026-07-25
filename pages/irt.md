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

$$ \theta_{i} \leftarrow \theta_i + \eta \frac{\partial\mathcal{L}_{\text{MLE}}}{\partial\theta_i}, a_j \leftarrow a_j + \eta\frac{\partial \mathcal{L}_{\text{MLE}}}{\partial a_j}, b_j \leftarrow b_j + \dots, c_j \leftarrow c_j + \dots, d_j \leftarrow d_j + \dots $$

**Expectation-Maximization**

**Hamiltonian Monte-Carlo**

[Wu et al. (2020)](https://web.stanford.edu/~cpiech/bio/papers/variationalItemResponseTheory.pdf) proposed **VIBO**, a **variational inference** method for fitting IRT models to large datasets. The authors made the assumptions listed below

Assume:

$\theta_i \in \mathbb{R}^{K} : \mathbb{P}[\theta_i] = \prod_{k=1}^K \mathbb{P}[\theta_{i,k}]$ where $\mathbb{P}[\theta_{i,k}] \sim \mathcal{N}(0,1)$

$\mathbb{P}[\\{a_j, b_j, c_j, d_j\\}_{j=1:M}] = \prod\_{j=1}^M \mathbb{P}[\{a_j, b_j, c_j, d_j\}]$ where $\mathbb{P}[\{a_j, b_j, c_j, d_j\}] \sim \mathcal{N}(0,1)$

$q_\phi(\\{a_j,b_j,c_j,d_j\\}_{j=1:M} \| \mathbf{r}\_{i,1:M}) = q\_\phi(\\{a_j,b_j,c_j,d_j \\}\_{j=1:M}) = \prod\_{j=1}^M q\_\phi(\\{a_j,b_j,c_j,d_j \\}\_{j=1:M})$

Observed variable $x \in \mathcal{X}$ represents responses from a single student $\mathbf{r}_i$ and latent variables $z \in \mathbf{\mathcal{Z}}$ represents ability and item characteristics $\theta_i, \\{a_j,b_j,c_j,d_j\\}\_{j=1:M}$.

$$q_{\psi^*(x)}(z)=\arg\min_{q_{\psi(x)}} D_{\text{KL}}\big(q_{\psi(x)}(z),|,p(z|x)\big)=\arg\max_{\psi(x)}\mathbb{E}{q{\psi(x)}(z)}\left[\log\frac{p(x,z)}{q_{\psi(x)}(z)}\right]$$

*by definition: minimixing the KL-divergence to the log posterior is eqivalent to maximizing the ELBO*

Let $\mathbb{P}_D(x)$ be an empirical distribution over the observed variables. The average quality of the variational approximations is 

$$ \mathbb{E}_{\mathbb{P}_D(x)}\left[\max_{\psi(x)} \mathbb{E}_{q_{\psi(x)}(z)}\left[\frac{\mathbb{P}[x,z]}{q_{\psi(x)}(z)}\right]\right] $$

Learning an approximate posterior for each $x \in D$ can grow to be unweildy in a large dataset. [Wu et al. (2020)](https://web.stanford.edu/~cpiech/bio/papers/variationalItemResponseTheory.pdf) proposed an amortized function $f_\phi$ (parameterimized by $\phi$) that maps a person's responses directly to parameters of their approximate posterior distribution. The number of parameters in amortization is vastly smaller than learning a per-observation posterior.

$$ \max_\phi \mathbb{E}_{\mathbb{P}_D(x)}\left[\mathbb{E}_{q_\phi(z|x)}\left[\log \frac{\mathbb{P}[x,z]}{q_\phi(z|x)}\right]\right] $$

$$
\begin{flalign}
\log \mathbb{P}_\theta[\mathbf{r}_{i,1:M}] \ge \text{VIBO} &\triangleq \mathcal{L}_{\text{recon}} + \mathbb{E}_{q_\phi(\{a_j,b_j,c_j,d_j\}_{j=1:M}|\mathbf{r}_{i,1:M})}[D_{\text{ability}}] + D_{\text{item}} \\
\mathcal{L}_{\text{recon}} &= \mathbb{E}_{q_\phi(\theta_i, \{a_j, b_j, c_j, d_j\}_{j=1:M}|\mathbf{r}_{i,1:M})}\left[\log \mathbb{P}_\theta[\mathbf{r}_{i,1:M}|\theta_i, \{a_j, b_j, c_j, d_j\}_{j=1:M}]\right] \\
D_{\text{ability}} &= D_{\text{KL}}\left(q_\phi(\theta_i|\{a_j,b_j,c_j,d_j\}_{j=1:M}, \mathbf{r}_{i,1:M})\|\mathbb{P}[\theta_i]\right)\\
D_{\text{item}} &= D_{\text{KL}}(q_\phi(\{a_j,b_j,c_j,d_j\}_{j=1:M}|\mathbf{r}_{i,1:M})\|\mathbb{P}[\{a_j,b_j,c_j,d_j\}_{j=1:M}])\\
\end{flalign}
$$

[Wu et al. (2020)](https://web.stanford.edu/~cpiech/bio/papers/variationalItemResponseTheory.pdf) proved that VIBO is a lower bound on the log marginal probability of person $i$'s response and estimated the gradients with respect to $\theta$ and $\phi$.

$$
\begin{flalign}
\nabla_\theta\text{VIBO} &= \nabla_\theta\mathcal{L}_{\text{recon}} \\
&= \mathbb{E}_{q_\phi(\theta_i, \{a_j,b_j,c_j,d_j\}_{j=1:M})}[\nabla_\theta\log\mathbb{P}_\theta[\mathbf{r}_{i,1:M}|\theta_i, \{a_j,b_j,c_j,d_j\}_{j=1:M}]] \\
\nabla_\phi\text{VIBO} &= \nabla_\phi \mathbb{E}_{q_\phi(\{a_j,b_j,c_j,d_j\}_{j=1:M}|\mathbf{r}_{i,1:M})}[D_\text{ability}] + \nabla_\phi D_{\text{item}} \\
&= \nabla_\phi\mathbb{E}_{q_\phi(\theta_i, \{a_j,b_j,c_j,d_j\}_{j=1:M})} \left[\frac{\mathbb{P}[\theta_i]\mathbb{P}[\{a_j,b_j,c_j,d_j\}_{j=1:M}]}{q_\theta(\theta_i, \{a_j,b_j,c_j,d_j\}_{j=1:M}|\mathbf{r}_{i,1:M})}\right] \\
\end{flalign}
$$

# Citations

Columbia University Mailman School of Public Health. (n.d.). [Item Response Theory](https://www.publichealth.columbia.edu/research/population-health-methods/item-response-theory).

Wu et al (2020). [Variational Item Response Theory: Fast, Accurate, and Expressive](https://web.stanford.edu/~cpiech/bio/papers/variationalItemResponseTheory.pdf)
