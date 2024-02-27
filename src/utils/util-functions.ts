export const setEventClass = (name: string) => {
    let i = 0;
    const alphabets = 'abcdefghijklmnopqrstuvwxyz';
    while(!name[i].match(/[a-zA-Z]/)){
        i++;
        if(i==name.length-1){
            return 1;
        }
    }
    return  (alphabets.indexOf(name[i])+1)%3
}