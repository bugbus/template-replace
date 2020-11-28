import * as vscode from 'vscode';
import {FileExplorer} from './usercase/fileExplorer'
import {Entry} from './core/Entry'
import MakeReplaceValue from './usercase/MakeReplaceValue'
import ReplaceText from './usercase/ReplaceText'

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "templatereplace" is now active!');

	vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from templateReplace!');
	});

	var test = "";
	// 打开文件选择框
	vscode.commands.registerCommand('config.setWorkSpacePath', (value) => {
		vscode.window.showOpenDialog({ 
		  canSelectFiles:false, // 是否可选文件
		  canSelectFolders:true, // 是否可选文件夹
		  canSelectMany:false, // 是否可以选择多个
		}).then((folderUris)=>{
		  if (!folderUris) {
			return null;
		  }
		  vscode.workspace.getConfiguration().update('conf.replace.workSpacePath', folderUris[0].path, vscode.ConfigurationTarget.Global);
		});
	  });
	
	  //
	let disposable = vscode.commands.registerCommand('fileExplorer.replace', (node:Entry) => {
		const editor = vscode.window.activeTextEditor;
		
		if (editor) {
			const toDep = (moduleName: string, vlaue: string) => {		
		}

		const document = editor.document;
		const selection = editor.selection;
		const word = document.getText();

		let firstLine = editor.document.lineAt(0);
		let lastLine = editor.document.lineAt(editor.document.lineCount - 1);
		let textRange = new vscode.Range(
		0,
		firstLine.range.start.character,
		editor.document.lineCount-1,
		lastLine.range.end.character);

		editor.edit(editBuilder=>{
		editBuilder.replace(textRange,replaceTarStr(word,node));
		});

	}
	});
	new FileExplorer(context);
	context.subscriptions.push(disposable);
}

export function replaceTarStr(word:any,node:Entry):string {
	var temp = new MakeReplaceValue(word,node);
	var rep = new ReplaceText();
	rep.setData(temp.groupingVariable());
	rep.setIdentifier(temp.getIdentifier());
	rep.setTextValue(temp.getTextValue());
	return rep.replace();
  }
