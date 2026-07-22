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

`TODO`: what is it

## Glossary

| Term              | Definition                            |
|-------------------|---------------------------------------|
| $i$               | subject $i$                           |
| $j$               | item $j$                              |
| $a_j$             | (item) discrimination parameter       |
| $b_j$             | (item) difficulty parameter           |
| $c_j$             | (item) guessing parameter; the chance of a correct response for a very low $\theta$|
| $d_j$             | probability of endorsing an (item) incorrect answer in spite of high ability |
| $D=1.7$           | scaling constant                      |
| $\theta_i$        | (subject) ability. Formally cited as $\theta \in (-\infty, \infty)$, it more often is the case $\theta \in [-3, +3]$. An estimated ability of 1.2 can be interpreted as 1.2 standard deviations above the average ability in the population. |
| $\mathbf{r}_{ij}$ | response from subject $i$ to item $j$ |

## Assumptions

## Models
### Unidimensional, Dichotomous

| Parameter | Formula |
|-----------|---------|
| 1PL       | $\mathbf{P}[\mathbf{r}_{ij}=1 \| \theta_i, b_j] = \frac{\exp(D(\theta-b_j))}{1+\exp(Da(\theta-b_j))} = \frac{1}{1+\exp[-Da(\theta_i-b_j)]}$ |
| 2PL       | $\mathbf{P}[\mathbf{r}_{ij}=1 \| \theta_i, a_j, b_j] = \frac{\exp(\theta_i-b_j)}{1+\exp[a_j(\theta_i-b_j)]} = \frac{1}{1+\exp[-Da_j(\theta_i-b_j)]}$ |
| 3PL       | $\mathbf{P}[\mathbf{r}_{ij}=1 \| \theta_i, a_j, b_j, c_j] = c_j + (1-c_j)\frac{1}{1+\exp[-Da_j(\theta_i-b_j)]}$ |
| 4PL       | $\mathbf{P}[\mathbf{r}_{ij}=1 \| \theta_i, a_j, b_j, c_j, d_j] = c_j + (d_j-c_j)\frac{1}{1+\exp[-Da_j(\theta_i-b_j)]}$ |

## Optimization
### Item Parameters
### Abilities

# Citations