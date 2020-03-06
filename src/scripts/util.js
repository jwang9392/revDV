export const locations = {
  "Manhattan": {
    "Central Harlem": ["10026", "10027", "10030", "10037", "10039"],
    "Chelsea and Clinton": ["10001", "10011", "10018", "10019", "10020", "10036"],
    "East Harlem": ["10029", "10035"],
    "Gramercy Park and Murray Hill": ["10010", "10016", "10017", "10022"],
    "Greenwich Village and Soho": ["10012", "10013", "10014"], 
    "Lower Manhattan": ["10004", "10005", "10006", "10007", "10038", "10280"],
    "Lower East Side": ["10002", "10003", "10009"],
    "Upper East Side": ["10021", "10028", "10044", "10065", "10075", "10128"],
    "Upper West Side": ["10023", "10024", "10025"],
    "Inwood and Washington Heights": ["10031", "10032", "10033", "10034", "10040"]
  }, 
  "Bronx": {
    "Central Bronx": ["10453", "10457", "10460"],
    "Bronx Park": ["10458", "10467", "10468"],
    "High Bridge and Fordham": ["10451", "10452", "10456"],
    "Hunts Point and Mott Haven": ["10454", "10455", "10459", "10474"],
    "Kingsbridge and Riverdale": ["10463", "10471"],
    "Northeast Bronx": ["10466", "10469", "10470", "10475"],
    "Southeast Bronx": ["10461", "10462", "10464", "10465", "10472", "10473"]
  },
  "Brooklyn": {
    "Central Brooklyn": ["11212", "11213", "11216", "11233", "11238"],
    "Southwest Brooklyn": ["11209", "11214", "11228"],
    "Borough Park": ["11204", "11218", "11219", "11230"],
    "Canarsie and Flatlands": ["11234", "11236", "11239"],
    "Southern Brooklyn": ["11223", "11224", "11229", "11235"],
    "Northwest Brooklyn": ["11201", "11205", "11215", "11217", "11231"],
    "Flatbush": ["11203", "11210", "11225", "11226"],
    "East New York and New Lots": ["11207", "11208"],
    "Greenpoint": ["11211", "11222"],
    "Sunset Park": ["11220", "11232"],
    "Bushwick and Williamsburg": ["11206", "11221", "11237"]
  },
  "Queens": {
    "Northeast Queens": ["11361", "11362", "11363", "11364"],
    "North Queens": ["11354", "11355", "11356", "11357", "11358", "11359", "11360"],
    "Central Queens": ["11365", "11366", "11367"],
    "Jamaica": ["11412", "11423", "11432", "11433", "11434", "11435", "11436"],
    "Northwest Queens": ["11101", "11102", "11103", "11104", "11105", "11106"],
    "West Central Queens": ["11374", "11375", "11379", "11385"],
    "Rockaways": ["11691", "11692", "11693", "11694", "11695", "11697"],
    "Southeast Queens": ["11004", "11005", "11411", "11413", "11422", "11426", "11427", "11428", "11429"],
    "Southwest Queens": ["11414", "11415", "11416", "11417", "11418", "11419", "11420", "11421"],
    "West Queens": ["11368", "11369", "11370", "11372", "11373", "11377", "11378"]
  },
  "Staten Island": {
    "Port Richmond": ["10302", "10303", "10310"],
    "South Shore": ["10306", "10307", "10308", "10309", "10312"],
    "Stapleton and St. George": ["10301", "10304", "10305"],
    "Mid-Island": ["10314"]
  }
}

export const dataParse = (data) => {
  const pieTreeData = {
    name: "zipcode",
    children: [
      {
        name: "$10m <", 
        children: []
      }, {
        name: "$1m < $10m",
        children: []
      }, {
        name: "$500k < $1m",
        children: []
      }, {
        name: "$200k to $500k",
        children: []
      }, {
        name: "< $200k",
        children: []
      }
    ]
  };
  // total avg calc for that zip code
  let totalCount = 0;
  let totalVal = 0;

  // split into 5 price brackets
  // 10mil +, 1mil - 10mil, 500k-9.999k, 200-499k, < 200k
  let bracket1Val = 0;
  let bracket2Val = 0;
  let bracket3Val = 0;
  let bracket4Val = 0;
  let bracket5Val = 0;
  let bracket1Ct = 0;
  let bracket2Ct = 0;
  let bracket3Ct = 0;
  let bracket4Ct = 0;
  let bracket5Ct = 0;

  let bracketBldgClass = [{},{},{},{},{}];


  data.forEach(propertyObj => {
    let propVal = parseInt(propertyObj.fullval);
    let bldgClass = propertyObj.bldgcl;
    // total avg
    totalVal = totalVal + propVal;
    totalCount++;

    // price brackets
    if (propVal >= 10000000) {
      bracket1Val += propVal;
      bracket1Ct += 1

      if (bracketBldgClass[0][bldgClass] === undefined) {
        bracketBldgClass[0][bldgClass] = 1;
      } else {
        bracketBldgClass[0][bldgClass] += 1;
      }
    } else if (propVal < 10000000 && propVal >= 1000000) {
      bracket2Val += propVal;
      bracket2Ct += 1;

      if (bracketBldgClass[1][bldgClass] === undefined) {
        bracketBldgClass[1][bldgClass] = 1;
      } else {
        bracketBldgClass[1][bldgClass] += 1;
      }
    } else if (propVal < 1000000 && propVal >= 500000) {
      bracket3Val += propVal;
      bracket3Ct += 1;

      if (bracketBldgClass[2][bldgClass] === undefined) {
        bracketBldgClass[2][bldgClass] = 1;
      } else {
        bracketBldgClass[2][bldgClass] += 1;
      }
    } else if (propVal < 500000 && propVal >= 200000) {
      bracket4Val += propVal;
      bracket4Ct += 1;

      if (bracketBldgClass[3][bldgClass] === undefined) {
        bracketBldgClass[3][bldgClass] = 1;
      } else {
        bracketBldgClass[3][bldgClass] += 1;
      }
    } else if (propVal < 200000) {
      bracket5Val += propVal;
      bracket5Ct += 1;

      if (bracketBldgClass[4][bldgClass] === undefined) {
        bracketBldgClass[4][bldgClass] = 1;
      } else {
        bracketBldgClass[4][bldgClass] += 1;
      }
    }
  });

  bracketBldgClass.forEach((bracket, i) => {
    
    for (let key in bracket) {
      let k = key;
      let v = bracket[k];
      
      pieTreeData.children[i].children.push(
        {
          name: k,
          size: v
        }
      )
    }
  });
  
  return pieTreeData;
  // return (totalVal / totalCount);
}

export const valueAverage = (data) => {
  let count = 0;
  let val = 0;

  data.forEach(element => {
    val += parseInt(element.fullval);
    count++;
  });

  return (val / count);
}
