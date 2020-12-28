import * as fs from 'fs';
import { workerData } from 'worker_threads';

import{Entry} from '../core/Entry';
import{LoopValue} from '../core/LoopValue'
import{IdentifierSite} from '../core/IdentifierSite';

class MakeReplaceValue{
  private identifierMaxRow:number = 1;
  private variableMaxRow:number = 1;
  private variable:Array<Array<string>> = new Array();
  private templateGroup:Array<LoopValue> = new Array();
  private identifier:Array<IdentifierSite> = new Array();
  private textValue:string = "";
  private groupValue:[]
  // constructor(word:string,node:Entry){
  //   this.readIdentifier(node);
  //   this.readVariable(word);
  // }
  constructor(inputValue:string,templateValue:string){
    // this.textValue = textValue;
    this.identifier = this.readTemplateFileForIdentifier(templateValue);
    this.templateGroup = this.readTemplateFileForGroup(templateValue);
    this.variable = this.readInputFile(inputValue);
    this.groupValue = this.groupingVariable();
  }

  public getIdentifier():Array<IdentifierSite>{
    // 模版文件中各种变量
    return this.identifier;
  }

  public getTextValue():string{
    return this.textValue;
  }

  public getTemplateGroup(){
    return this.templateGroup;
  }

  public getGroupValue(){
    return this.groupValue;
  }

  public groupingVariable():any{
    var replaceData=[];
    var groupingNum = this.identifierMaxRow===0?(this.variableMaxRow/this.identifierMaxRow):1;
    for(var i=0;i<this.variableMaxRow; i+=this.identifierMaxRow){
      replaceData.push(this.variable.slice(i,i+this.identifierMaxRow));
    }
    return replaceData;
  }
  // 读取模版文件，
  // private readIdentifier(){
  private readTemplateFileForIdentifier(templateValue:string):Array<IdentifierSite>{
    var identifier:Array<IdentifierSite> = new Array();
    var match = this.hasLoopReplace(templateValue);
    if(match){
      match.forEach((value)=>{
        var row = this.getIdentifierRow(this.fmtIdentifier(value));
        var clo = this.getIdentifierCol(this.fmtIdentifier(value));
        if(this.identifierMaxRow<row){this.identifierMaxRow = row;}
        identifier.push({
          x:row-1,
          y:clo-1,
          type: 'templateValue',
          value:this.fmtIdentifier(value)
        });
      });
    }
    return identifier;
  }
  private hasLoopReplace(value:string):RegExpMatchArray | null{
    var re = /(?:\{[r,c]\d+\}|\{r\d+c\d+\})/g;
    let match:RegExpMatchArray | null = value.match(re);
    return match;
  }

  private readTemplateFileForGroup(templateValue:string):Array<LoopValue>{
    var loopValue:Array<LoopValue> = new Array();
    // var re = /(?:\{\.\.\.\}?:\r|\n|\r\n|\n\r)/g;
    // var re = /(?:\{\.\.\.\}(?:\r|\n|\r\n|\n\r))/g    //  从开头开始有多个空格，包含{...},连带会车符号。
    var re = / *(?:{...})(?:\r|\n|\r\n|\n\r)/g;//多个空格后加上{...}和会车符

    let match:RegExpMatchArray | null = templateValue.match(re);
    if(match){
      templateValue.split(re).forEach(value=>{
        if(this.hasLoopReplace(value)){
          loopValue.push({isLoop:true,value:value});
        }else{
          loopValue.push({isLoop:false,value:value});
        }
      });
    }else{
      loopValue.push({isLoop:true,value:templateValue});
    }
    return loopValue;
  }

  private getIdentifierRow(value:string):number{
    return parseInt(value.substring(value.search('r')+1,value.search('c')));
  }

  private getIdentifierCol(value:string):number{
    return parseInt(value.substring(value.search('c')+1,value.search('}')+1));
  }

  fmtIdentifier(value:string):string{
    if(value.search(/\{r\d+\}/g)>0){
      return value.replace("\}","c1}");
    }else if(value.search(/\{c\d+\}/g)>0){
      return value.replace("\{","{r1");
    }else{
      return value;
    }
  }

  //读取输入文件，按照会车和制表符转换为二维数组
  // readVariable(word:string){
  readInputFile(word:string):Array<Array<string>>{
    var variable:Array<Array<string>> = new Array()
    const rCol = /(?:\r|\n|\r\n|\n\r)/g;
    word.split(rCol).forEach((str)=>{
      if(str===""){return;}
      const rRow = /(?:\t)/g;
      var vartemp:Array<string> = new Array();
      str.split(rRow).forEach((varitem)=>{
        if(varitem===""){return;}
        vartemp.push(varitem);
      });
      variable.push(vartemp);
    });
    this.variableMaxRow = variable.length;
    return variable;
  }
}

export default MakeReplaceValue;
