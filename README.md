# Immune Response Template

IRT is a initiative project for a full cycle infrastructure for population, validation and visualization of the available data on immune cells and cytokine interactions in humans. The unique feature of the project is its focus on tools and support for QSP modeling by providing:

* interactive schemes (passports of immune cells);
* annotation of each process, cell and cytokine with cross references and links to the external databases;
* rate equations of key processes involved in immune response derived on the basis of existing knowledge;
* values of parameters of the rate equations identified via fitting of the specific sub-models to human in vitro and in vivo data;
* extended annotation of rate equations and parameters;
* automatic generation of model templates.

Download: [IRT main features booklet](doc/IRT 1.0 2016 booklet A5 online.pdf)

Download: [IRT summary presentation](doc/160901_IRT_presentation_ISB.pdf)

IRT team makes an effort in two direction: the development of database on human immune cells interaction (IRT database) and the development of tools for navigation and model creation (IRT navigator).

# IRT database

## Motivation
Immunotherapy is a new class of cancer treatment that works by activation of immune response of patient to fight with tumor cells. The immunotherapy is able to demonstrate very high efficacy in cancer treatment (for, example, PD-1 and PD-L1 inhibitors) the strong stimulation of immune systems could lead to the side effect related to the autoimmunity. That is why optimization of different types of immunotherapies and their combinations is very important to stimulate immune system strong enough to kill tumor cells, but not so strong to cause autoimmunity. The main challenge in optimization of immunotherapies is the complexity of immune system, interactions between different types of immune cells, cancer cells, cytokines, chemokines and other participant of immune response.

The aim of this project is to develop a tool describing interaction of different types of immune cells, cytokines, chemokines and other participants of immune response.

## Content of database

For each type of immune cells we have developed *"cells passport"* which is the scheme visualizing literature available experimental facts on

- activation/differentiation and proliferation of the cell;
- cytokines which is synthesized by this type of cell upon activation;
- cytokines/cells that affect this type of cell.

For each cytokine we have developed a scheme (*cytokines sources profile*) visualizing literature available experimental facts on

- production of the cytokine by different immune cells located in blood, lymph node and tissue;
- regulation of production of the cytokine by other cytokines.

# IRT navigator

## Purpose
IRT navigator is a tool to access IRT database. IRT navigator provides the intuitive interface for searching the information and model template creation. IRT navigator allows:

- visualization of cell dynamics of immune cells;
- navigation across multiple interactions of immune cells;
- automatic generation of model template based on the user selection which can be downloaded as SBML file;
- automatic summary report generation based on the user selection.

### Markdown

Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for

```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).

### Jekyll Themes

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/insysbio/irt_navigator/settings). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

### Support or Contact

Having trouble with Pages? Check out our [documentation](https://help.github.com/categories/github-pages-basics/) or [contact support](https://github.com/contact) and we’ll help you sort it out.
