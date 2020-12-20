import * as vscode from 'vscode';
import {FileExplorer} from './usercase/fileExplorer';
import {FileSystemProvider} from './usercase/fileExplorer';
import {Entry} from './core/Entry';
import MakeReplaceValue from './usercase/MakeReplaceValue';
import ReplaceText from './usercase/ReplaceText';
import { TextDecoder } from 'util';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
	// console.log('Congratulations, your extension "templatereplace" is now active!');

	const fileExplorer = new FileExplorer(context);
	fileExplorer.createTreeView();

	context.subscriptions.push(vscode.commands.registerCommand('fileExplorer.openFile', (resource) => {
		fileExplorer.openResource(resource);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('fileExplorer.openFloder', (resource) => {
		fileExplorer.openFloder(resource.uri);
	}));

	// const fileSystemProvider = new FileSystemProvider();
	// context.subscriptions.push(vscode.commands.registerCommand('fileExplorer.refreshEntry', (resource) => {
	// 	// vscode.window.showInformationMessage("R");
	// 	fileExplorer.refresh();
	// }));

	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
		if (e.affectsConfiguration('conf.replace.workSpacePath')) {
			fileExplorer.createTreeView();
		}
	}));

	// vscode.commands.registerCommand('fileExplorer.refreshEntry', (resource) => {
	// 	// vscode.window.showInformationMessage("R");
	// 	fileExplorer.refresh();f
	// });
	
	// vscode.commands.registerCommand('fileExplorer.addEntry',
	// (resource) => {
	// 	vscode.window.showInformationMessage(resource);
	// });

	// vscode.commands.registerCommand('fileExplorer.deleteEntry',
	// (node:Entry) => {
	// 	vscode.window.showInformationMessage(node.uri.path);
	// 	fileSystemProvider.delete(node.uri,{recursive:false});
	// });


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
	
	let disposable = vscode.commands.registerCommand('fileExplorer.replace', async (node:Entry) => {
		let editor = vscode.window.activeTextEditor;
		if (!editor) {return null;}
		const document = editor.document;

		const documentName = document.fileName;
		if(!documentName.match(/Untitled-[\d]+/g)){
		vscode.window.showInformationMessage("不能在这个文件下执行替换。。。🤗️");
		// let doc = await vscode.workspace.openTextDocument({ language: 'plaintext', content: testdoc });
		// editor = await vscode.window.showTextDocument(doc);
		return null;
		}

		const selection = editor.selection;
		const word = document.getText();

		let firstLine = editor.document.lineAt(0);
		let lastLine = editor.document.lineAt(editor.document.lineCount - 1);
		let textRange = 
		new vscode.Range(
			0,
			firstLine.range.start.character,
			editor.document.lineCount-1,
			lastLine.range.end.character);

		const testdoc = replaceTarStr(word,node);

		editor.edit(editBuilder=>{
		editBuilder.replace(textRange,testdoc);
		});
	});
	context.subscriptions.push(disposable);
}

export function replaceTarStr(word:any,node:Entry):string {
    let opt:any={
		encoding:'utf-8',
	  };

    var textValue = fs.readFileSync(node.uri.fsPath,opt).toString();
	var temp = new MakeReplaceValue(word,textValue);
	var rep = new ReplaceText();
	rep.setData(temp.getGroupValue());
	rep.setIdentifier(temp.getIdentifier());
	rep.setTextValue(textValue);
	rep.setTemplateGroup(temp.getTemplateGroup());
	return rep.replace();
  }

export function createOutputChannel(param : string) : vscode.OutputChannel {
	let outputName : string = `${param}`;
	let resultDocument : vscode.OutputChannel = vscode.window.createOutputChannel(outputName);
	resultDocument.show(true);
	return resultDocument;
}

async function showSampleText(context: vscode.ExtensionContext): Promise<void> {
	const sampleTextEncoded = await vscode.workspace.fs.readFile(vscode.Uri.file(context.asAbsolutePath('sample.txt')));
	const sampleText = new TextDecoder('utf-8').decode(sampleTextEncoded);
	const doc = await vscode.workspace.openTextDocument({ language: 'plaintext', content: sampleText });
	vscode.window.showTextDocument(doc);
}