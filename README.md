# BIONICLE Community Colorpack

![GitHub release (by tag)](https://img.shields.io/github/downloads/kohila/bionicle-community-colorpack/1.0.0/total?style=for-the-badge&logo=github&link=https%3A%2F%2Fgithub.com%2FKohila%2Fbionicle-community-colorpack%2Freleases%2Fnew)

This code repository is a work-in-progress project that aims to meet the following objectives:

- Standardize a framework for members of the BIONICLE community to use when creating custom Stud.io colors
- Provide a comprehensive library of custom Stud.io colors made by the BIONICLE community

## Navigating the Colors Directory

The `colors/` directory is the root folder location that contains the entirety of the BCC color library. To better categorize color definitions in a way that can be navigated easily by members of the community, the BCC classifies color definitions based on four main attributes: **Usage**, **Effect**, **Opacity**, and **Finish**.


### Usage Type
`colors/{usage}/...`
The **Usage** Type indicates how color definitions are used within Stud.io.

The _Basic_ Type is the default Usage type and is assigned to color definitions that emulate either existing or hypothetical real-world LEGO color palette equivalents.

The _Special_ Type is assigned to color definitions that are created to fulfill an artistic, render-only, or specialized purpose. Special Type color definitions are not required to adhere to the limitations set by deeper Type levels. However, authors may choose to do so to 

### Effect Type
`colors/{usage}/{material}/...`
The **Effect** Type indicates the visual material additives, or lack thereof, to LEGO elements that color definitions seek to emulate.

The _Standard_ Type 

The _Pearl_ Type

The _Metallic_ Type

The _Glitter_ Type

The _Speckle_ Type

The _Phosphorescent_ Type

### Opacity Type
`colors/{usage}/{material}/{opacity}/...`
The **Opacity** Type indicates the way that light does or does not pass and refract through the material of LEGO element.

The _Opaque_ Type is the default Opacity type and is assigned to color definitions that have no light passthrough and no light refraction.

The _Translucent_ Type is an Opacity type that is assigned to color definitions that have moderate light passthrough and moderate light refraction.

The _Transparent_ Type is an Opacity type that is assigned to color definitions that have high light passthrough and minimal light refraction.

### Finish Type
`colors/{usage}/{material}/{opacity}/{finish}/...`

The _Gloss_ Type is a Finish type that is assigned to color definitions that have a smooth, reflective surface. These colors typically correspond to LEGO elements made of the following plastics: [ABS](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_61299), [CA](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652943714127_6168), [PA](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_25809), [POM](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_27614), [PC](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_22003), [MABS](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_23936), [SAN](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_17938), and [TP](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_29370).

The _Semigloss_ Type is a Finish type that is assigned to color definitions that have a smooth, semi-reflective surface. These colors typically correspond to LEGO elements made of the following plastics: [PP](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_67419), [HIPS](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_49986), [PET](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_39143), [LDPE, and HDPE](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_31062).

The _Matte_ Type is a Finish type that is assigned to color definitions that have a rougher, non-reflective surface. These colors typically correspond to LEGO elements made of textiles as well as the following plastics: [MTPO](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_32695), [TPU](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_34285), and [SEBS](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_35818).