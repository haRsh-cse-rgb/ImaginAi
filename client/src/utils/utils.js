import { prompts } from "../constants/prompts";
import FileSaver from 'file-saver';

export function getRandomPrompt(prompt) {
    const index= Math.floor(Math.random() * prompts.length);

    const randomPrompt = prompts[index];

    if(randomPrompt===prompt) return getRandomPrompt(prompt);

    return randomPrompt;
}

export async function downloadImage(_id , photo){
    FileSaver.saveAs(photo , `download-${_id}.jpg`);
}