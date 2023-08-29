// {
//   "presets": [
//     "@babel/preset-env",
//     [
//       "@babel/preset-react",
//       {
//         "runtime": "automatic"
//       }
//     ],
//     "@babel/preset-typescript",
//     [
//       "babel-plugin-direct-import",
//       { 
//         "modules": ["@mui/material", "@mui/icons-material"] 
//       }
//     ]
//   ]
// }

module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-typescript"
  ]
}
