function convertArg(arg1,arg2,arg3,arg4,arg5){
  let res = '';
  const someArr = [arg1,arg2,arg3,arg4,arg5];
  someArr.forEach((element,index)=>{
    if(index!=0){
      res = res+",";  
    }
    if(isNaN(element)){
      res = res+'"'+element+'"';
    }
    else{ 
      res = res+element;
    }    
  })
  return res;
}
function convertRange(range1,range2,range3,range4){
  let res = "";
  const someArr = [range1,range2,range3,range4];
  someArr.forEach((element,index)=>{
    if(index!=0){
      res = res+",";  
    }
    res = res+change2DArrToString(element);
  })
  return res;
}
function change2DArrToString(arr){
  if(arr==undefined){
    return undefined;
  }
  var res = "[";
  for(var i = 0; i < arr.length; i++){
    if(arr[i].length!=0){
      res = res+"["+'"'+arr[i][0]+'"';
      for(var j = 1; j < arr[i].length; j++){
        res = res+","+'"'+arr[i][j]+'"';
        
      }
      res = res+"]";
    }
    else{
      res = res+"[]"
    }
    res = res+",";
  }
  res = res.substring(0,res.length-1);
  return res+"]";
}
function change1DArrToString(arr){
  var res = "["+arr[0];
  for(var i = 1; i < arr.length; i++){
    res = res+","+arr[i];
  }
  return res+"]";
}
//b
function sheetMakeDict(range1,range2,range3){
  //Thi function is currently only for vertical elements
  const dict = {};
  try{
    if(range2==undefined){
      for(let i = 0; i < range1.length;i++){
        if(range1[i].length==1){
          dict[range1[i][0]] = "No Value";
        }
        if(range1[i].length!=2){
          dict[range1[i][0]] = [];
          range1[i].forEach((element,index)=>{
            if(index!=0){
            dict[range1[i][0]].push(element);            
            }
          })
        }
        else{
          dict[range1[i][0]] = range1[i][1];
        }
      }
    }else if(range3==undefined){
      range1.forEach((element,index)=>{
        if(range2[index]!=null){
          if(range2[index].length>1){
            dict[element[0]] = [];
            range2[index].forEach((element2)=>{
              dict[element[0]].push(element2);            
            })
          }
          else{
            dict[element[0]] = range2[index][0];
          }
        }
      })
      
    }
    else{
      range1.forEach((element,index)=>{
        if(range2[index]!=null){
          dict[element[0]] = [];
          range2[index].forEach((element2)=>{
            dict[element[0]].push(element2);            
          })
        }
        if(range3[index]!=null){
          range3[index].forEach((element3)=>{
            dict[element[0]].push(element3); 
          })
        }
      })
    
    }
    return dict;
  }
  catch(e){
    return "Please put appropriate values\nAutomated Error: "+e;
  }
}
function stringParser(value,keyWord,keyWord2,length,flag){
  const inputArr = [value,keyWord,keyWord2,length,flag];
  flag = identifyFlag(inputArr)
  try{
    if(flag==0){
      const orgArr = inputControl([0,1,3],inputArr);
      value = orgArr[0];
      keyWord = orgArr[1];
      length = orgArr[3];
      const start = value.indexOf(keyWord);
      return value.substring(start,start+length);
    }
    else if(flag==1){
      const orgArr = inputControl([0,1,2],inputArr);
      value = orgArr[0];
      keyWord = orgArr[1];
      keyWord2 = orgArr[2];
      const start = value.indexOf(keyWord);
      const end = value.indexOf(keyWord2);
      return value.substring(start,end);
    }
  }
  catch(e){
    return "Maybe wrong flag?\nAutomatic Error: "+e;
  }
  return "Make sure you put correct variables for the appropriate flag";
}
function identifyFlag(inputArr){
  for(let i = inputArr.length-1; i >= 0;i--){
    if(!isNaN(inputArr[i])){
      return inputArr[i];
    }
  }
  return -1;
}
function inputControl(indexArr,inputArr){
  let index = 0;
  const resArr = new Array(inputArr.length).fill(0);
  for(let i = 0; i < indexArr.length;i++){
    resArr[indexArr[i]] = 1;
  }
  for(let i = 0; i < inputArr.length;i++){
    if(index==indexArr.length){
      break;
    }
    if(inputArr[i]!=undefined){
      resArr[indexArr[index]] = inputArr[i];
      index++;
    }
  }
  return resArr;
}
function tcall(functionName,arg1,arg2,arg3,arg4,arg5){
  const func = functionName+'('+convertArg(arg1,arg2,arg3,arg4,arg5)+')';
  return eval(func);
}

function tcallR(functionName,range1,range2,range3,range4){
  const func = functionName+"("+convertRange(range1,range2,range3,range4)+")";
  return eval(func);
}
function test(val1){
  return val1+3;
}
function someTest(){
  Logger.log(tcall("stringParser","Chame Chame Lakius Overlr","Lakius",4,0));
  Logger.log(stringParser("Chame Chame Lakius Overlor","Lakius","Over",1));
 // Logger.log(sheetMakeDict([['a',1,2,4,1],['b',4],['c',5,6]],[[3],[4],[5]],[[7,3,3],[4,5]]))
}