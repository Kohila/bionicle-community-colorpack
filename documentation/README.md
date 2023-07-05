# Table of Contents

1. Project Structure
   1. The Colors Directory
      1. [Usage Type](#Usage_Type)
      2. [Opacity Type](#Opacity_Type)
      3. [Material Type](#Material_Type)
      4. [Finish Type](#Finish_Type)
      5. BrickLink/Stud.io Color Categories in the Colors Directory
   2. The Utils Directory
2. Contributing to the Project
   1. Create a Working Branch
   2. Generating a Color Template
   3. Testing a Color
   4. Submit a Pull Request


# Project Structure

## The Colors Directory

The `colors/` directory is the root folder location that contains the entirety of the BCC color library. To better categorize color definitions in a way that can be navigated easily by members of the community, the BCC classifies color definitions based on four main attributes: **Usage**, **Opacity**, **Material**, and **Finish**.


### Usage Type
`colors/{usage}/...`

The **Usage** Type indicates how color definitions are used within Stud.io.

| Type | Description |
| --- | --- |
|**Basic** _(default)_ | Type assigned to color definitions that emulate either existing or hypothetical real-world LEGO color palette equivalents. |
| **Special** | Type assigned to color definitions that are created to fulfill an artistic, render-only, or specialized purpose. Special Type color definitions are not required to adhere to the limitations set by deeper Type levels. However, authors may choose to use deeper Type levels for Special Types at their discretion. |

### Opacity Type
`colors/{usage}/{opacity}/...`

The **Opacity** Type indicates the way that light does or does not pass and refract through the LEGO elements.

| Type | Description |
| --- | --- |
| **Opaque** _(default)_ | Type assigned to color definitions that have no light passthrough and no light refraction. |
| **Translucent** | Type assigned to color definitions that have moderate light passthrough and moderate light refraction. |
|**Transparent** | Type assigned to color definitions that have high light passthrough and minimal light refraction. |

### Material Type
`colors/{usage}/{opacity}/{material}/...`

The **Material** Type indicates the various additives and post-processing coatings that is commonly given to LEGO elements.

| Type | Description |
| --- | --- |
| **Solid** _(default)_ | Type assigned to color definitions that include neither material additives nor post-processing. |
| **Pearl** | Type assigned to color definitions that include pearlescent material color additives. |
| **Glitter** | Type assigned to color definitions that include reflective flaked material color additives. |
| **Speckle** | Type assigned to color definitions that include reflective granulated material color additives. |
| **Phosphorescent** | Type assigned to color definitions that include glow-in-the-dark material color additives. |
| **Chrome** | Type assigned to color definitions that are given highly reflective, chromed post-production coatings. _(NOTE: Per the nature of post-production coatings, color definitions in this type are not given Finish types.)_ |
| **Metallic** | Type assigned to color definitions that are given moderately reflective, drum lacquered post-production coatings.  _(NOTE: Per the nature of post-production coatings, color definitions in this type are not given Finish types.)_ |


### Finish Type
`colors/{usage}/{opacity}/{material}/{finish}/...`

The **Finish** Type indicates the way that light does or does not interact with the surface of an element.

| Type | Description |
| --- | --- |
| **Generic** _(default)_ | Type assigned to color definitions that do not emulate the visual properties of any explicit real-world material. _(Ideally, all color definitions should be sorted into one of the three other Finish types.)_ |
| **Gloss** | Type assigned to color definitions that have a smooth, reflective surface. These colors typically correspond to LEGO elements made of the following plastics: [ABS](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_61299), [CA](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652943714127_6168), [PA](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_25809), [POM](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_27614), [PC](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_22003), [MABS](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_23936), [SAN](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_17938), and [TP](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_29370). |
| **Semigloss** | Type assigned to color definitions that have a smooth, semi-reflective surface. These colors typically correspond to LEGO elements made of the following plastics: [PP](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_67419), [HIPS](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_49986), [PET](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_39143), [LDPE, and HDPE](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_31062).|
| **Matte** | Type assigned to color definitions that have a rougher, non-reflective surface. These colors typically correspond to LEGO elements made of textiles as well as the following plastics: [MTPO](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_32695), [TPU](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_34285), and [SEBS](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_35818). |

### BrickLink/Stud.io Color Categories in the Colors Directory
| BrickLink/Stud.io Color Category | BCC Colors Directory Location |
| --- | --- |
| **Solid Colors** | `colors/basic/opaque/...` |
| **Transparent Colors** | `colors/basic/transparent/...` |
| **Chrome Colors** | `colors/basic/opaque/chrome/...` |
| **Pearl Colors** | `colors/basic/opaque/pearl/...` |
| **Satin Colors** | `colors/basic/translucent/pearl/...` |
| **Metallic Colors** | `colors/basic/opaque/metallic/...` |
| **Milky Colors** |  `colors/basic/opaque/phosphorescent/...` OR `colors/basic/translucent/solid/...` OR `colors/basic/translucent/phosphorescent/...` |
| **Glitter Colors** | `colors/basic/transparent/glitter/...` |
| **Speckle Colors** | `colors/basic/opaque/speckle/...` |