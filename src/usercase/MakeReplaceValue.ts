import * as fs from 'fs';
import { workerData } from 'worker_threads';

import{Entry} from '../core/Entry';
import{IdentifierSite} from '../core/IdentifierSite';

class MakeReplaceValue{
  private identifierMaxRow:number = 1;
  private variableMaxRow:number = 1;
  private variable:Array<Array<string>> = new Array();
  private identifier:Array<IdentifierSite> = new Array();
  private textValue:string = "";

  constructor(word:string,node:Entry){
    this.readIdentifier(node);
    this.readVariable(word);
  }

  public getIdentifier():Array<IdentifierSite>{
    return this.identifier;
  }

  public getTextValue():string{
    return this.textValue;
  }

  private readIdentifier(node:Entry){
    let opt:any={
      encoding:'utf-8',
    };

    this.textValue = fs.readFileSync(node.uri.fsPath,opt).toString();

    var re = /(?:\{[r,c]\d+\}|\{r\d+c\d+\})/g;

    let match:RegExpMatchArray | null = this.textValue.match(re);

    if(match){
      match.forEach((value)=>{
        var row = this.getIdentifierRow(this.fmtIdentifier(value));
        var clo = this.getIdentifierCol(this.fmtIdentifier(value));
        if(this.identifierMaxRow<row){this.identifierMaxRow = row;}
        this.identifier.push({
          x:row-1,
          y:clo-1,
          value:this.fmtIdentifier(value)
        });
      });
    }
  }

  private getIdentifierRow(value:string):number{
    return parseInt(value.substring(value.search('r')+1,value.search('c')));
  }

  private getIdentifierCol(value:string):number{
    return parseInt(value.substring(value.search('c')+1,value.search('}')+1));
  }

  private fmtIdentifier(value:string):string{
    if(value.search(/\{r\d+\}/g)>0){
      return value.replace("\}","c1}");
    }else if(value.search(/\{c\d+\}/g)>0){
      return value.replace("\{","{r1");
    }else{
      return value;
    }
  }

  private readVariable(word:string){
    const rCol = /(?:\r|\n|\r\n|\n\r)/g;
    word.split(rCol).forEach((str)=>{
      if(str===""){return;}
      const rRow = /(?:\t)/g;
      var vartemp:Array<string> = new Array();
      str.split(rRow).forEach((varitem)=>{
        if(varitem===""){return;}
        vartemp.push(varitem);
      });
      this.variable.push(vartemp);
    });
    this.variableMaxRow = this.variable.length;
  }

  public groupingVariable():any{
    var replaceData=[];
    var groupingNum = this.identifierMaxRow===0?(this.variableMaxRow/this.identifierMaxRow):1;
    for(var i=0;i<this.variableMaxRow; i+=this.identifierMaxRow){
      replaceData.push(this.variable.slice(i,i+this.identifierMaxRow));
    }
    return replaceData;
  }
}

export default MakeReplaceValue;
