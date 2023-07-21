/**
 * Color settings in XML format
 */

const XML = `
<material displacement_method="bump" heterogeneous_volume="False" name="SOLID-SAMPLE_COLOR" use_local_tuning="False" use_mis="True" use_transparent_shadow="True" volume_interpolation_method="linear" volume_sampling_method="multiple_importance">
	<shader>
		<color name="Sample_Color" value="1.0 1.0 1.0" />
		<!-- The rest of the color settings go here . . . -->
	</shader>
</material>
`

/**
 * Color settings in JSON format
 */

const JSON = {
  material: {
    $: {
      displacement_method: "bump",
      heterogeneous_volume: "False",
      name: "SOLID-SAMPLE_COLOR",
      use_local_tuning: "False",
      use_mis: "True",
      use_transparent_shadow: "True",
      volume_interpolation_method: "linear",
      volume_sampling_method: "multiple_importance",
    },
    shader: {
      color: {
        $: {
          name: "Sample_Color",
          value: "1.0 1.0 1.0",
        },
      },
    },
  },
}

/**
 * Color Definition in JSON format
 */

export const color = {
  id: {
    studio: "12345678",
    bricklink: "12345678",
    ldraw: "12345678",
    ldd: "12345678",
  },
  name: {
    studio: "Sample Color",
    bricklink: "Sample Color",
    ldraw: "Sample Color",
    ldd: "Sample Color",
  },
  category: {
    name: "Solid Colors",
    nickname: "Gloss Colors",
  },
  groupId: "-1",
  rgb: "#FFFFFF",
  alpha: "1",
  instructions: {
    rgb: "#FFFFFF",
    cmyk: "0,0,0,0",
  },
  notes: "(Future location of BCC defined metadata, e.g. Color Author)",
  xml: XML,
  json: JSON,
}
