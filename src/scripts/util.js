import {fetchZipData} from './api';

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

export let zipLatLong = null;
const zipData = fetchZipData();
zipData.then(resp => zipLatLong = resp);

export const dataParse = (data) => {
  debugger
  const pieTreeData = {
    name: "zipcode",
    // val: 0,
    // count: 0,
    children: [
      {
        name: "$10m <", 
        // val: 0,
        // count: 0,
        children: []
      }, {
        name: "$1m < $10m",
        // val: 0,
        // count: 0,
        children: []
      }, {
        name: "$500k < $1m",
        // val: 0,
        // count: 0,
        children: []
      }, {
        name: "$200k to $500k",
        // val: 0,
        // count: 0,
        children: []
      }, {
        name: "< $200k",
        // val: 0,
        // count: 0,
        children: []
      }
    ]
  };
  // total avg calc for that zip code
  // split into 5 price brackets
  // 1: 10mil +, 2: 1mil - 10mil, 3: 500k-9.999k, 4: 200-499k, 5: < 200k
  // EACH BRACKET ASSESSED VALUES AND COUNTS FOR AVERAGE *****************

  let bracketBldgClass = [{},{},{},{},{}];

  data.forEach(propertyObj => {
    let propVal = parseInt(propertyObj.fullval);
    let bldgClass = propertyObj.bldgcl;
    
    // total avg
    // pieTreeData.val = pieTreeData.val + propVal;
    // pieTreeData.count++;

    // price brackets
    if (propVal >= 10000000) {
      // pieTreeData.children[0].val += propVal;
      // pieTreeData.children[0].count += 1
      bldgClassParse(bldgClass, 0, bracketBldgClass)
    } else if (propVal < 10000000 && propVal >= 1000000) {
      // pieTreeData.children[1].val += propVal;
      // pieTreeData.children[1].count += 1;
      bldgClassParse(bldgClass, 1, bracketBldgClass)
    } else if (propVal < 1000000 && propVal >= 500000) {
      // pieTreeData.children[2].val += propVal;
      // pieTreeData.children[2].count += 1;
      bldgClassParse(bldgClass, 2, bracketBldgClass)
    } else if (propVal < 500000 && propVal >= 200000) {
      // pieTreeData.children[3].val += propVal;
      // pieTreeData.children[3].count += 1;
      bldgClassParse(bldgClass, 3, bracketBldgClass)
    } else if (propVal < 200000) {
      // pieTreeData.children[4].val += propVal;
      // pieTreeData.children[4].count += 1;
      bldgClassParse(bldgClass, 4, bracketBldgClass)
    }
  });

  bracketBldgClass.forEach((bracket, i) => {
    for (let key in bracket) {
      
      let v = []
      let classCodesObj = bracket[key];

      for (let classCodes in classCodesObj) {
        v.push({
          name: classCodes,
          size: classCodesObj[classCodes]
        })
      }

  
      pieTreeData.children[i].children.push(
        {
          name: key,
          children: v
        }
      )
    }
  });
  
  debugger
  return pieTreeData;
}

const bldgClassParse = (bldgClass, i, bldgParseObj) => {
  let classType = bldgClass.split("")[0];

  if (bldgParseObj[i][classType] === undefined) {
    let classObj = {};
    classObj[bldgClass] = 1;

    bldgParseObj[i][classType] = classObj;
  } else if (bldgParseObj[i][classType] && bldgParseObj[i][classType][bldgClass]) {
    bldgParseObj[i][classType][bldgClass] += 1;
  } else {
    bldgParseObj[i][classType][bldgClass] = 1;
  }
}