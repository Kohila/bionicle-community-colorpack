/** @module typedefs */

/**
 * @global
 * @typedef {Object} Color
 * @prop {Object} name All possible names for the Color.
 * @prop {string} name.studio The name of the Color in Stud.io.
 * @prop {string} name.bricklink The name of the Color on BrickLink.
 * @prop {string} name.ldraw The name of the Color in LDraw.
 * @prop {string} name.ldd The name of the Color in LEGO Digital Designer.
 * @prop {Object} id All possible IDs for the Color.
 * @prop {number} id.studio The ID of the Color in Stud.io.
 * @prop {number} id.bricklink The ID of the Color on BrickLink.
 * @prop {number} id.ldraw The ID of the Color in LDraw.
 * @prop {number} id.ldd The ID of the Color in LEGO Digital Designer.
 * @prop {Object} category The category information for the Color.
 * @prop {string} category.name The name of the category that contains the Color.
 * @prop {string} category.nickname The custom category that contains the Color.
 * @prop {number} groupId The ID number of the color group that contains the Color.
 * @prop {string} rgb The comma-delimited RGB values of the Color.
 * @prop {number} alpha The alpha opacity of the Color, within the range 0.0 - 1.0.
 * @prop {Object} instructions The instructions information for the Color.
 * @prop {string} instructions.rgb The comma-delimited RGB values of the Color as used in instructions.
 * @prop {string} instructions.cmyk The comma-delimited CMYK values of the Color as used in instructions/
 * @prop {string} notes Any miscellaneous metadata for the Color.
 * @prop {string} xml The Color settings encoded in XML format.
 * @prop {Object | string} json The Color settings encoded in JS/JSON format.
 */

/**
 * @global
 * @typedef {Object} rgb
 * @prop {number} r The red value, within the range 0-255.
 * @prop {number} g The green value, within the range 0-255.
 * @prop {number} b The blue value, within the range 0-255.
 */