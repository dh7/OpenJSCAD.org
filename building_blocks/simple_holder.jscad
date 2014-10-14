// title: Simple Holder
// author: Damien Henry
// license: MIT License

// Here we define the user editable parameters: 
function getParameterDefinitions() {
  return [
    { name: 'diameter', caption: 'Diameter (plate hole):', type: 'float', initial: 10 },
    { name: 'height', caption: 'Height (plate width):', type: 'float', initial: 15 },
    { name: 'outer_diameter', caption: 'holder diameter:', type: 'float', initial: 15 },
    { name: 'outer_height', caption: 'holder height:', type: 'float', initial: 5 },
    { name: 'squizzer_hole_height', caption: 'squizzer hole height:', type: 'float', initial: 13 },
    { name: 'squizzer_hole_width', caption: 'squizzer hole width:', type: 'float', initial: 3 }
  ];
}

function main(params) {
  var height = params.height;
  var diameter = params.diameter;
  var outer_diameter = params.outer_diameter;
  var outer_height = params.outer_height;
  var total_height = height+outer_height;
  var hole_width = params.squizzer_hole_width;
  var hole_height = params.squizzer_hole_height;
  
  var base = cylinder({h: height, r: diameter/2.});
  var holder = cylinder({h: params.outer_height, r: params.outer_diameter/2});
  holder = cylinder({r2: diameter/2., r1: outer_diameter/2., h: outer_height});
  holder = scale([diameter/outer_diameter,1, 1], holder);
  holder = holder.translate([0, 0, height]);
  var squizer_hole = cube({size: [outer_diameter, hole_width, hole_height],center: [true,true,false]});
  squizer_hole = translate([0,0,total_height-hole_height],squizer_hole);
  var result = union(base, holder);
  result = difference(result, squizer_hole);
  return result;
}


