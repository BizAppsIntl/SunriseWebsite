// Updated: -Fri17Mar2023 {GetTot4mArray (VoucherCart.VItems, 'Qty')}
// Updated: -Mon13Mar2023 add convertion from Dte to DteYYMMDD function
// Updated: -Wed01Mar2023  add TimeLapse fn
// Updated: -Thr16Feb2023  
// Updated: -Thr15Feb2023  add Typeof in AlertRec

// --------------------------
// // <pre>RecCount={Recs.length}<br /> {JSON.stringify({ RecordsReceived: Recs }, null, 2)}</pre>
// <pre>Rec: {JSON.stringify({ RecordsReceived: EofTrxs }, null, 2)}</pre>

// --------------------------
// //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx


//&nbsp;


// //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx



//Array(n + 1).join("*")
//Array(11).join("*")   gets line of 10 *s
//word = Array(11).join('a')
//[...Array(5)].map((E,I) => I+10) 
// //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx

//'abc/d/efg/hadffai/jkl'.split('/')[3].startsWith('h')
// //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx
// a=[{a:'a1', b:'b1'}, {a:'a2', b:'b2'}, {a:'a3', b:'b3'}]

// //ks=Object.keys(a).map(k=>k)

// a.map(e=>{return(
// Object.keys(e)
//   .map(k=>{return(k+': '+e[k])})
//   .join(',\t')

// )}).join('\n')

// a: a1,	b: b1
// a: a2,	b: b2
// a: a3,	b: b3
// //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx

//[...Array(5)].reduce ((t,e)=>t=t+'%','')
//'%%%%%'
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx

export function Dte2StrYYMMDD(dt) {
  //Source:   8:04:15 P.M. 1672585455692, Sun Jan 01 2023 20:04:15 GMT+0500 (Pakistan Standard Time):
  //Return(6digits):   230101 in string YY MM DD
  //Format:             YY MM DD

  console.log('\n\n\n\nRcvd Date: ', dt)

  const date = new Date(dt);
  //if (!separator){separator =''}
  return [
    ('00' + date.getFullYear()).slice(-2),
    ('00' + (date.getMonth() + 1)).slice(-2),
    ('00' + date.getDate()).slice(-2)
  ].join();
}

export function Dte2YMD(dt, debugTxt = '') {
  // console.log( debugTxt+'\nOrg RCVD date: ', dt)
  dt = new Date(dt);
  // console.log('Parsed date: ', dt)

  // console.log('\n\nnew Date( of Rcvd Date) : ', dt,'\nResult of Dte2YMD: ', (new Date(dt.getFullYear(), dt.getMonth(), dt.getDate())) )
  return (new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()));
}




export function TimeLapsed(from, to) {
  if (!from || !to) return ''
  //  console.log('Before*******************************************************************************************************Date rcvd--- from: ' ,from, ' to: ', to)
  from = new Date(from)
  to = new Date(to)
  //console.log('Processed*******************************************************************************************************Date rcvd--- from: ' ,from, ' to: ', to)


  let ts = (to.getTime() - from.getTime()) / 1000
  //console.log('After*******************************************************************************************************Date rcvd--- from: ' ,from, ' to: ', to)

  var d = Math.floor(ts / (3600 * 24));
  var h = Math.floor(ts % (3600 * 24) / 3600);
  var m = Math.floor(ts % 3600 / 60);
  var s = Math.floor(ts % 60);



  // //param: duration in milliseconds
  //  var se = parseInt((ts/1000)%60)
  //       , mi = parseInt((ts/(1000*60))%60)
  //       , hr = parseInt((ts/(1000*60*60))%24)
  //       , ds  = parseInt(ts/(1000*60*60*24));

  //       console.log('ds:', ds,'hr:',  hr,'mi:',  mi,'se:',  se)

  //   // var Ds = parseInt(ds*24);
  //   // hours += hoursDays;
  //   // hours = (hours < 10) ? "0" + hours : hours;
  //   // minutes = (minutes < 10) ? "0" + minutes : minutes;
  //   // seconds = (seconds < 10) ? "0" + seconds : seconds;
  //   // return hours + ":" + minutes + ":" + seconds;


  //  console.log('d:', d,'h:',  h,'m:',  m,'s:',  s)
  var ret = ''
  if (s > 0) ret += s + 's'
  if (m > 0) ret = +m + 'm, ' + ret
  if (h > 0) ret = +h + 'h, ' + ret
  if (d > 0) ret = +d + 'd, ' + ret

  //console.log('From: ', from, ' To: ', to, '\n',    'd:', d,'h:',  h,'m:',  m,'s:',  s)
  return ret;
}

export function CurrentTime(separator = ':', AMPM = true, ZeroWithHour = false) {
  //4:38:04pm (10dig)
  const time = new Date();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();
  let temp = String(hour % 12);
  if (temp === "0") {
    temp = "12";
  }
  // temp += (minute < 10 ? ":0" : ":") + minute;
  // temp += (second < 10 ? ":0" : ":") + second;
  // temp += hour >= 12 ? " PM" : " AM";

  if (ZeroWithHour) if (temp.length == 1) temp = '0' + temp
  temp += (minute < 10 ? separator + "0" : separator) + minute;
  temp += (second < 10 ? separator + "0" : separator) + second;
  if (AMPM) temp += hour >= 12 ? "pm" : "am";
  return temp;
}

export function DateTimeStamp(separator = '') {
  //Source:   8:04:15 P.M. 1672585455692, Sun Jan 01 2023 20:04:15 GMT+0500 (Pakistan Standard Time):
  //Return(15digits):   23-01-01-20-04-15-692
  //Format:             YY MM DD HH MM SS MSx
  const date = new Date();
  //if (!separator){separator =''}
  return [
    ('00' + date.getFullYear()).slice(-2),
    ('00' + (date.getMonth() + 1)).slice(-2),
    ('00' + date.getDate()).slice(-2),
    ('00' + date.getHours()).slice(-2),
    ('00' + date.getMinutes()).slice(-2),
    ('00' + date.getSeconds()).slice(-2),
    ('00' + date.getMilliseconds()).slice(-3),
    // (''+Math.random()).slice(-3) ,
    // Math.floor(Math.random() * max)    
  ].join(separator);
}

export function GetNewID(separator = '') {
  //Source:   8:04:15 P.M. 1672585455692, Sun Jan 01 2023 20:04:15 GMT+0500 (Pakistan Standard Time):
  //Return(20digits):   23-01-01-20-04-15-692-64400
  //Format:             YY MM DD HH MM SS MSx TimeInMilliSeconds(5digits)
  const date = new Date();
  //if (!separator){separator =''}
  return [
    ('00' + date.getFullYear()).slice(-2),
    ('00' + (date.getMonth() + 1)).slice(-2),
    ('00' + date.getDate()).slice(-2),
    ('00' + date.getHours()).slice(-2),
    ('00' + date.getMinutes()).slice(-2),
    ('00' + date.getSeconds()).slice(-2),
    ('00' + date.getMilliseconds()).slice(-3),
    ('00' + Date.now()).slice(-5)
    // (''+Math.random()).slice(-3) ,
  ].join(separator);
}

// ==============================================================
export const SetDteDDMMMYY = (dt) => {
  return dt.getDate()
}
export function SetDateTimeISOFormat(date, time = '') {
  //Source:   8:04:15 P.M. 1672585455692, Sun Jan 01 2023 20:04:15 GMT+0500 (Pakistan Standard Time):
  //Return:   YYYY-MM-DDThh:mm:ss                   
  //Format:   YYYY-MM-DDThh:mm:ss                   


  //const date = new Date(date);
  const dt = [
    ('00' + date.getFullYear()).slice(-2),
    ('00' + (date.getMonth() + 1)).slice(-2),
    ('00' + date.getDate()).slice(-2)
  ].join('-')

  const tm = [
    ('00' + time.getHours()).slice(-2),
    ('00' + time.getMinutes()).slice(-2),
    ('00' + time.getSeconds()).slice(-2)
  ].join(':');

  alert('Inside fn OUT: ' + dt + 'T' + tm)
  return (dt + 'T' + tm)
}

// ==============================================================
export function  StrLenB4Zero(str){
// ('12340') >> 4, '12300' >> 3
  
  //let a='12300'.split('')
  let a=str.split('')
  let l=a.length
  //console.log(a, l)
  let r=l
  for (let i=l-1; i>=0; i--) {
    //console.log(i, a[i], r)

    //      [Number of Character]
    //if(a[i]!=='0') {setRtValue(r); return(r);}
    //else r=l-i;
    //setRtValue(r)

    //if(a[i]!=='0') {setRtValue(i+1); return(i+1);}
    if(a[i]!=='0') return(i+1)
  }
  return(0)
}



// ==============================================================
//const string = "XYZ 123 ABC 456 ABC 789 ABC";
export function GetPositionInStr(string, subString, NthPositionIndex) {
  return string.split(subString, NthPositionIndex).join(subString).length;
}
//console.log(   getPosition(string, 'ABC', 2) )      // --> 16

// ==============================================================
export const SetPadLeftZero = (num, size) => {
  // ('0000' + 11).slice(-3) // '011'
  return (('0000000000' + num).slice(-size))
}

export const SetPadLeftSpace = (txt, size) => {
  // ('0000' + 11).slice(-3) // '011'
  return (('                                 ' + txt).slice(-size))
}

export const SetPadRightSpace = (txt, size) => {
  // ('0000' + 11).slice(-3) // '011'
  return ((txt + '                                 ').slice(0, size))
}
// ==============================================================
export const GetTot4mArray = (array, field) => {
  // Usage: {GetTot4mArray (VoucherCart.VItems, 'Qty')}
  // const tot = array.reduce( (accum, E) => {    
  //     // alert(field + '['+ E[field]+ '] ['+ (E[field]+E[field]) +' ]' + typeof(E[field]) + '  accum: '+ '['+ accum+ '] ' + typeof(accum))
  //     accum = Number(accum) + Number(E[field]);         // accum += Number(E[field]);
  //         return (accum);
  //     }, 0)            
  // return tot

  return array.reduce((tot, E) => Number(tot) + Number(E[field]), 0)
}

// ==============================================================
//2nd Method
export function Str2TitleCase(str) {
  // var org=str
  str = str.toLowerCase().split(' ');
  // console.log(' ***************************\nString Array of '+org, str)

  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}
//2nd Method
// function Str2TitleCase(str) {
//   return str.toLowerCase().split(' ').map(function(word) {
//     return (word.charAt(0).toUpperCase() + word.slice(1));
//   }).join(' ');
// }
//3rd Method
// export function Str2TitleCase(str) {
//   return str.toLowerCase().split(' ').map(function(word) {
//     return word.replace(word[0], word[0].toUpperCase());
//   }).join(' ');
// }


// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxxxxx=
// Get 10 Unique Nos list from 1-100 
export const GetUniqueRandomNos = (Min = 1, Max = 100, Length = 10) => {
  // Sol-1 ==============
  // var arr = [];
  // while (arr.length < 8) {
  //   var r = Math.floor(Math.random() * 100) + 1;
  //   if (arr.indexOf(r) === -1) arr.push(r);
  // }
  // console.log(arr);


  // Sol-2 ==============
  const nums = new Set();
  while (nums.size !== Length) {
    nums.add(Math.floor(Math.random() * (Max - Min + 1) + Min));
  }

  // console.log([...nums]);  
  return [...nums]
}


// Get 1 Rand No list from 1-100 
export const GetRandomNo = (Min = 1, Max = 100) => {
  return Math.floor(Math.random() * (Max - Min + 1) + Min)
}

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxxxxx=
// ======= GET UNIQUE LIST
export const uniqueBy = (arr, prop) => {
  const result = arr.reduce((a, d) => {
    if (!a.includes(d[prop])) { a.push(d[prop]); }
    return a;
  }, []);

  // AlertRec (result, 'Unique results ')
  return result
}
//  var categories = uniqueBy(array, 'category')
//  console.log(ages); //['General Questions', 'Pricing'  ]

//.......................................................................
// An elegant solution using ES6:
// Sample    const [CitiesList, setCitiesList] = useState(GetUniqueList(_DocsRef.Data, 'City') || []);
export const GetUniqueList = (ArrOfObj, field) => {
  const list = ArrOfObj.map(x => x[field]);
  return ([...new Set(list)])
}
// END   ============== GET UNIQUE LIST
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxxxxx=

//Filtered List 
var array = [{ id: 1, name: "test1" }, { id: 2, name: "test2" }, { id: 3, name: "test3" }, { id: 4, name: "test4" }];
var anotherOne = [{ id: 2, name: "test2" }, { id: 4, name: "test4" }];
const filteredArray = array.filter(E => (anotherOne.filter(e => e.id === E.id)).length !== 0)

//.......................................................................

const FilteredListFromOtherList = () => {
  /* Here's an example that uses (some) ES6 Javascript semantics to filter an object array by another object array. */
  // x = full dataset
  // y = filter dataset
  let x = [
    { "val": 1, "text": "a" },
    { "val": 2, "text": "b" },
    { "val": 3, "text": "c" },
    { "val": 4, "text": "d" },
    { "val": 5, "text": "e" }
  ],
    y = [
      { "val": 1, "text": "a" },
      { "val": 4, "text": "d" }
    ];

  // Use map to get a simple array of "val" values. Ex: [1,4]
  let yFilter = y.map(itemY => { return itemY.val; });

  // Use filter and "not" includes to filter the full dataset by the filter dataset's val.
  let filteredX = x.filter(itemX => !yFilter.includes(itemX.val));

  // Print the result.
  console.log(filteredX);

  //.......................................................................

  let arr = [{ id: 1, title: "title1" }, { id: 2, title: "title2" }]
  let brr = [{ id: 2, title: "title2" }, { id: 3, title: "title3" }]

  // .some =>TRUE/FALSE   returns TRUE for first match otherwise returns FALSE if none is matched.
  const res = arr.filter(f => brr.some(item => item.id === f.id));
  console.log(res);

  //.......................................................................

  // remove 2,4 from 1,2,3,4 
  //[{id:1},{id:2},{id:3},{id:4}].filter(v=>!([{id:2},{id:4}].some(e=>e.id === v.id)))
  //Array [ { id: 1 }, { id: 3 } ]

  // get items 2,4 from 1,2,3,4 
  //[{id:1},{id:2},{id:3},{id:4}].filter(v=> ([{id:2},{id:4}].some(e=>e.id === v.id)))
  //Array [ { id: 2 }, { id: 4 } ]

}



// ==============================================================
export const AlertConfirm = (DataSet, Title, Prefix = '') => {

  // var array = Object.keys(DataSet).map((k, i) => {
  //   return (i + 1 + '  ' + k + ' : ' + DataSet[k] )
  // });
  // // window.alert(array)
  // const stringData = array.reduce((result, item) => {
  //       return `${result} ${item} \n `
  //  }, Title +"\n" )   
  // window.alert(stringData)


  //  if(!Prefix) Prefix=''

  console.log('DataSet for Alert ' + Title + ' :', DataSet)
  let str = '           [ ' + Title + ' ]\n';
  var array = Object.keys(DataSet).map((k, i) => {
    // console.log(i +' key: '+k + '  Type of DataSet[k]: '+ typeof (DataSet[k]))

    str +=
      (Prefix + (i + 1) + '  ' + k + ' : ' + (DataSet[k] === null ? "NULL VALUE \n" : DataSet[k] === undefined ? "undefined- ERROR VALUE \n" :
        ((typeof (DataSet[k]) !== "object")
          ? DataSet[k].toString() + '\t [' + typeof (DataSet[k]) + ' ... ' + DataSet[k].toString().length + ']'
          : DataSet[k].toString() + '\n' + AlertRec(DataSet[k], 'SubArrayOf: ' + (i + 1), '  =>' + Prefix + (i + 1) + '.')
        )
        + '\n')
      )

    return (i + 1 + '  ' + k + ' : ' + DataSet[k])
  });

  return (window.confirm(str))
}

// ===========[       LOOP SAMPLES                  ]===================================================
// Object.keys(DataSet).map((k2, i2) => {
//   (i2++ + '  ' + k2 + ' : ' + DataSet[k2].toString() + '\n'  
// Object.entries(tifs).map(([key,value],i) => arr.push(<option key={i} value={key}>{value}</option>))  
// const tifOptions = Object.keys(tifs).map(key =>   <option value={key}>{tifs[key]}</option>)
// var tifOptions = Object.keys(tifs).map(function(key) {  return <option value={key}>{tifs[key]}</option>});
// var tifOptions = []; Object.keys(tifs).forEach(function(key) { tifOptions.push(<option value={key}>{tifs[key]}</option>);});

// const studentDetails = ['Alex', 'Anik', 'Deven', 'Rathore'];
// const names = []
// studentDetails.forEach((data) => {   names.push(<h3 className='student_name'>{data}</h3>)})
// return (  <div className='container'>     {names}   </div> )

// ==============================================================
export const AlertRec = (DataSet, Title, Prefix = '') => {

  // var array = Object.keys(DataSet).map((k, i) => {
  //   return (i + 1 + '  ' + k + ' : ' + DataSet[k] )
  // });
  // // window.alert(array)
  // const stringData = array.reduce((result, item) => {
  //       return `${result} ${item} \n `
  //  }, Title +"\n" )   
  // window.alert(stringData)


  //  if(!Prefix) Prefix=''

  console.log('DataSet for Alert ' + Title + ' :', DataSet)
  if (DataSet === undefined) { return (window.alert(`*****[  Received DataSet: (${Title}) is UNDEFINED  ]*****`)) }

  let str = '(DataSet.length=' + DataSet.length + ')\t\t[ ' + Title + ' ]\n';
  var array = Object.keys(DataSet).map((k, i) => {
    // console.log(i +' key: '+k + '  Type of DataSet[k]: '+ typeof (DataSet[k]))

    str +=
      (Prefix + (i + 1) + '  ' + k + ' : ' + (DataSet[k] === null ? "NULL VALUE \n" : DataSet[k] === undefined ? "undefined- ERROR VALUE \n" :
        ((typeof (DataSet[k]) !== "object")
          ? DataSet[k].toString() + '\t [' + typeof (DataSet[k]) + ' ... ' + DataSet[k].toString().length + ']'
          : DataSet[k].toString() + '\n' + AlertRec(DataSet[k], 'SubArrayOf: ' + (i + 1), '  =>' + Prefix + (i + 1) + '.')
        )
        + '\n')
      )

    return (i + 1 + '  ' + k + ' : ' + DataSet[k])
  });

  !Prefix && window.alert(str)
  return (Prefix ? str : null)
}

// Object.keys(DataSet).map((k2, i2) => {
//   (i2++ + '  ' + k2 + ' : ' + DataSet[k2].toString() + '\n'  
// ==============================================================

export const GiveDataInStr = (DataSet, Title, Prefix = '') => {

  // var array = Object.keys(DataSet).map((k, i) => {
  //   return (i + 1 + '  ' + k + ' : ' + DataSet[k] )
  // });
  // // window.alert(array)
  // const stringData = array.reduce((result, item) => {
  //       return `${result} ${item} \n `
  //  }, Title +"\n" )   
  // window.alert(stringData)


  //  if(!Prefix) Prefix=''

  console.log('DataSet for Alert ' + Title + ' :', DataSet)
  let str = '(DataSet.length=' + DataSet.length + ')\t\t[ ' + Title + ' ]\n';
  var array =
    Object.keys(DataSet)
      .map((k, i) => {
        // console.log(i +' key: '+k + '  Type of DataSet[k]: '+ typeof (DataSet[k]))

        str +=
          (Prefix + (i + 1) + '  ' + k + ' : ' + (DataSet[k] === null ? "NULL VALUE \n" : DataSet[k] === undefined ? "undefined- ERROR VALUE \n" :
            ((typeof (DataSet[k]) !== "object")
              ? DataSet[k].toString() + '\t [' + typeof (DataSet[k]) + ' ... ' + DataSet[k].toString().length + ']'
              : DataSet[k].toString() + '\n' + AlertRec(DataSet[k], 'SubArrayOf: ' + (i + 1), '  =>' + Prefix + (i + 1) + '.')
            )
            + '\n')
          )

        return (i + 1 + '  ' + k + ' : ' + DataSet[k])
      });

  // !Prefix && window.alert(str)
  // return (Prefix ? str : null)
  return (str)
}

// Object.keys(DataSet).map((k2, i2) => {
//   (i2++ + '  ' + k2 + ' : ' + DataSet[k2].toString() + '\n'  
// ==============================================================

export const GiveRecsInString = (DataSet, Title, StrPreset) => {
  let str = '(DataSet.length=' + DataSet.length + ')\t\t[ ' + Title + ' ]\n';

  //const hd = Object.keys(DataSet).map((k, i) => { return (k) }).join(',\t')

  str += DataSet.map(e => {
    return (
      Object.keys(e)
        .map(k => { return (k + ': ' + e[k]) })
        .join(',\t')
    )
  }).join('\n')


  return (str)
}




export const GiveRecInString = (DataSet, StrPreset) => {
  let str = StrPreset + '           [ ' + '===Data Set===' + ' ]\n'; let idx = 1;
  Object.entries(DataSet).forEach(([k, v]) => { str += '==> ' + idx++ + '.  ' + k + ' : ' + v.toString() + '\n' })
  return (str)
}

export const DispRecInAlert = (DataSet, Title) => {
  let str = '           [ ' + Title + ' ]\n'; let idx = 1;
  Object.entries(DataSet).forEach(([k, v]) => {
    str +=
      (typeof v === "object")
        ? GivAPIInString(v, str)
        : (idx++ + '  ' + k + ' : ' + v.toString() + '\n')
  })
  window.alert(str)
}
export const DispArrayInAlert = (DataArray, Title) => {
  let str = '           [ ' + Title + ' ]\n'; let idx = 1;
  DataArray.map((itm, idx) => { str += idx++ + '  ' + itm + '\n' })
  window.alert(str)
}

export const GivAPIInString = (api, Str) => {
  let str = Str + '           [ ' + '===API===' + '                Total Elements=' + api.length + ' ]\n'; let idx1 = 1; let idx2 = 1;
  api.map((itm, idx) => {
    str += idx1++ + ' ===========>  [ ' + itm + ' ]\n'
    idx2 = 1
    Object.entries(itm).forEach(([k, v]) => { str += '==> ' + idx2++ + '.  ' + k + ' : ' + v + '\n' })
  })
  return (str)
}

export const DispAPIInAlert = (api, Title) => {
  let str = '           [ ' + Title + '                Total Elements=' + api.length + ' ]\n'; let idx1 = 1; let idx2 = 1;
  api.map((itm, idx) => {
    str += idx1++ + ' ===========>  [ ' + itm + ' ]\n'
    idx2 = 1
    Object.entries(itm).forEach(([k, v]) => { str += idx2++ + '  ' + k + ' : ' + v + '\n' })
  })
  window.alert(str)
}


export function BEEP(freq = 660, duration = 90, vol = 50) {
  var context = new (window.AudioContext || window.webkitAudioContext);
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  gain.gain.setValueAtTime(0, context.currentTime);
  gain.gain.linearRampToValueAtTime(1, context.currentTime + 0.002);
  oscillator.connect(gain);
  oscillator.frequency.value = freq;
  oscillator.type = "square";
  gain.connect(context.destination);
  oscillator.start(context.currentTime);
  oscillator.stop(context.currentTime + duration * .001);
  oscillator.onended = () => context.close();
}