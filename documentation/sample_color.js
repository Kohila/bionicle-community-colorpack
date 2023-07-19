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
    _displacement_method: "bump",
    _heterogeneous_volume: "False",
    _name: "SOLID-SAMPLE_COLOR",
    _use_local_tuning: "False",
    _use_mis: "True",
    _use_transparent_shadow: "True",
    _volume_interpolation_method: "linear",
    _volume_sampling_method: "multiple_importance",
    shader: {
      color: {
        _name: "Sample_Color",
        _value: "1.0 1.0 1.0",
      },
    },
  },
}

/**
 * Color Definition in JSON format
 */

export default color = {
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
  xml: XML,
  json: JSON,
}
