# Table of Contents

1. Project Structure
   1. [The Colors Directory](#the-colors-directory)
      1. [Color Types](#color-types)
         1. [Usage Type](#usage-ype)
         2. [Opacity Type](#opacity-type)
         3. [Material Type](#material-type)
         4. [Finish Type](#finish-type)
         5. [Additional Types](#additional-types)
         6. [BrickLink/Stud.io Color Categories in the Colors Directory](#bricklinkstudio-color-categories-in-the-colors-directory)
      2. [Color IDs](#color-ids)
   2. The Utils Directory
2. Contributing to the Project
   1. Create a Working Branch
   2. Generating a Color Template
   3. Testing a Color
   4. Submit a Pull Request


# Project Structure

## The Colors Directory

The `colors/` directory is the root folder location that contains the entirety of the BCC color library.

### Color Types

To better categorize color definitions in a way that can be navigated easily by members of the community, the BCC classifies color definitions based on four main types: **Usage**, **Opacity**, **Material**, and **Finish**.


#### Usage Type
`colors/{usage}/...`

The **Usage** Type indicates how color definitions are used within Stud.io.

| Type | Description |
| --- | --- |
|**Basic** _(default)_ | Type assigned to color definitions that emulate either existing or hypothetical real-world LEGO color palette equivalents. |
| **Special** | Type assigned to color definitions that are created to fulfill an artistic, render-only, or specialized purpose. Special Type color definitions are not required to adhere to the limitations set by deeper Type levels. However, authors may choose to use deeper Type levels for Special Types at their discretion. |

#### Opacity Type
`colors/{usage}/{opacity}/...`

The **Opacity** Type indicates the way that light does or does not pass and refract through the LEGO elements.

| Type | Description |
| --- | --- |
| **Opaque** _(default)_ | Type assigned to color definitions that have no light passthrough and no light refraction. |
| **Translucent** | Type assigned to color definitions that have moderate light passthrough and moderate light refraction. |
|**Transparent** | Type assigned to color definitions that have high light passthrough and minimal light refraction. |

#### Material Type
`colors/{usage}/{opacity}/{material}/...`

The **Material** Type indicates the various additives and post-processing coatings that is commonly given to LEGO elements.

| Type | Description | Example Image |
| --- | --- | --- |
| **Solid** _(default)_ | Type assigned to color definitions that include neither material additives nor post-production coatings. | <a href="https://img.bricklink.com/ItemImage/PN/32/3003.png"><img src="https://img.bricklink.com/ItemImage/PN/32/3003.png" style="max-height: 50px;" /></a> |
| **Pearl** | Type assigned to color definitions that include pearlescent material color additives. | <a href="https://img.bricklink.com/ItemImage/PN/115/3003.png"><img src="https://img.bricklink.com/ItemImage/PN/115/3003.png" style="max-height: 50px;" /></a>
| **Glitter** | Type assigned to color definitions that include flaked, reflective material color additives. | <a href="https://img.bricklink.com/ItemImage/PN/100/3003.png"><img src="https://img.bricklink.com/ItemImage/PN/100/3003.png" style="max-height: 50px;" /></a> |
| **Speckle** | Type assigned to color definitions that include granulated material color additives. | <a href="https://img.bricklink.com/ItemImage/PN/116/47456.original.png"><img src="https://img.bricklink.com/ItemImage/PN/116/47456.original.png" style="max-height: 50px;" /></a> |
| **Phosphorescent** | Type assigned to color definitions that include glow-in-the-dark material color additives. | <a href="https://img.bricklink.com/ItemImage/PN/159/3023.png"><img src="https://img.bricklink.com/ItemImage/PN/159/3023.png" style="max-height: 50px;" /></a> |
| **Opal** | Type assigned to color definitions that include ultra-fine granulated, reflective material color additives. | <a href="https://img.bricklink.com/ItemImage/PN/223/51283.png"><img src="https://img.bricklink.com/ItemImage/PN/223/51283.png" style="max-height: 50px;" /></a> |
| **Chrome** | Type assigned to color definitions that are given chromium, highly reflective post-production coatings. _(NOTE: Per the nature of post-production coatings, color definitions in this type are not given Finish types.)_ | <a href="https://img.bricklink.com/ItemImage/PN/22/3001.png"><img src="https://img.bricklink.com/ItemImage/PN/22/3001.png" style="max-height: 50px;" /></a> |
| **Metallic** | Type assigned to color definitions that are given drum lacquered, moderately reflective post-production coatings.  _(NOTE: Per the nature of post-production coatings, color definitions in this type are not given Finish types.)_ | <a href="https://img.bricklink.com/ItemImage/PN/65/3003.png"><img src="https://img.bricklink.com/ItemImage/PN/65/3003.png" style="max-height: 50px;" /></a> |


#### Finish Type
`colors/{usage}/{opacity}/{material}/{finish}/...`

The **Finish** Type indicates the way that light does or does not interact with the surface of an element.

| Type | Description |
| --- | --- |
| **Generic** _(default)_ | Type assigned to color definitions that do not emulate the visual properties of any explicit real-world material. _(Ideally, all color definitions should be sorted into one of the three other Finish types.)_ |
| **Gloss** | Type assigned to color definitions that have a smooth, reflective surface. These colors typically correspond to LEGO elements made of the following plastics: [ABS](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_61299), [CA](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652943714127_6168), [PA](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_25809), [POM](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_27614), [PC](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_22003), [MABS](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_23936), [SAN](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_17938), and [TP](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_29370). |
| **Semigloss** | Type assigned to color definitions that have a smooth, semi-reflective surface. These colors typically correspond to LEGO elements made of the following plastics: [PP](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_67419), [HIPS](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_49986), [PET](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_39143), [LDPE, and HDPE](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_31062).|
| **Matte** | Type assigned to color definitions that have a rougher, non-reflective surface. These colors typically correspond to LEGO elements made of textiles as well as the following plastics: [MTPO](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_32695), [TPU](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_34285), and [SEBS](https://bricknerd.com/home/every-type-of-plastic-used-by-lego-5-20-22#block-yui_3_17_2_1_1652985682489_35818). |

#### Additional Types

[TODO]

#### BrickLink/Stud.io Color Categories in the Colors Directory
| BrickLink/Stud.io Color Category | BCC Colors Directory Location |
| --- | --- |
| **Solid Colors** | `colors/basic/opaque/...` |
| **Transparent Colors** | `colors/basic/transparent/...` |
| **Chrome Colors** | `colors/basic/opaque/chrome/...` |
| **Pearl Colors** | `colors/basic/opaque/pearl/...` |
| **Satin Colors** | `colors/basic/translucent/opal/...` |
| **Metallic Colors** | `colors/basic/opaque/metallic/...` |
| **Milky Colors** |  `colors/basic/opaque/phosphorescent/...` OR `colors/basic/translucent/solid/...` OR `colors/basic/translucent/phosphorescent/...` |
| **Glitter Colors** | `colors/basic/transparent/glitter/...` |
| **Speckle Colors** | `colors/basic/opaque/speckle/...` |

## Color IDs

The Stud.io Color ID system allows for Color IDs ranging from `0` - `2,146,983,648`. To ensure assigned Color IDs within this established range, as well as to provide a buffer against the default defined Stud.io colors, the minimum allowable Color ID is set at `100,000,000` and the maximum is set at `1,999,999,999`.

| `x` Place in ID | Type | `x` Key |
| --- | --- | --- |
| `x` 0 0 0 0 0 0 0 0 0 | Usage Type | `0` — **Basic**<br />`1` — **Special** |
| 0 `x` 0 0 0 0 0 0 0 0 | Opacity Type | `1` — **Opaque**<br />`2` — **Translucent**<br />`3` — **Transparent** |
| 0 0 `x` `x` 0 0 0 0 0 0 | Material Type | `00`-`09` — **Solid**<br />`10`-`19` — **Pearl**<br />`20`-`29` — **Glitter**<br />`30`-`39` — **Speckle**<br />`40`-`49` — **Phosphorescent**<br />`50`-`59` — **Opal**<br />`60`-`64` — **Chrome**<br />`65`-`69` — **Metallic** |
| 0 0 0 0 `x` `x` 0 0 0 0 | Finish Type | `00`-`09` — **Gloss**<br />`10`-`19` — **Semigloss**<br />`20`-`29` — **Matte** |

Viewers may note a proliferation of gaps in these `x` ranges — this is by design! This Color ID system has built-in futureproofing in the event that LEGO releases new colors that would introduce new types to the Type system, or if future community discussion presents the need for additional Types to be added.

Color authors can claim ID ranges within the `Special` category. ID ranges are typically allocated `1,000` at a time per author. Exceptionally prolific color authors may claim more IDs if they wish, in multiples of `1,000`. However, since the initial BDBCC started at ~1,000 colors _total_, this is not recommended.