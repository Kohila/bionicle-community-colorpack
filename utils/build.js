/**
 * This script generates ready-to-use, distributable packages of the BIONICLE Community Colorpack.
 */

/** @TODO:
 * 1. Create the ./.build folder
 * 2. Create bionicle-community-colorpack-vX.X.X and bionicle-community-colorpack-library-vX.X.X
 *    folders within the ./build folder
 * 3. Read all JSON color definitions from ./colors
 * 4. Generate a CustomColorDefinition.txt file from those definitions and copy to both build folders
 * 5. Read all XML color settings from ./colors
 * 6. Generate a CustomColorSettings.xml file from those settings and copy to the
 *    ./.build/bionicle-community-colorpack-vX.X.X location
 * 7. Generate the nested tree structure for the color settings XML files and copy to the
 *    ./.build/bionicle-communicty-colorpack-library-vX.X.X location
 * 8. Compress both of the build folders to publish with release
 */