const justifyParagraph = (text, len) => {
    words = text.split(" ");
    words = words.filter((w) => w !== "");
    //console.log(words);

    index = 0;
    lines = [];
    while (index < words.length) {
        count = words[index].length;
        next = index + 1;
        while (next < words.length) {
            if (words[next].length + count + 1 > len) {
                break;
            }
            count += words[next].length + 1;
            next++;
        }
        //console.log(next)
        line = "";
        diff = next - index + 1;

        if (next === words.length || diff === 0) {
            for (let i = index; i < next; i++) {
                line += words[i] + " ";
            }

            line = line.substr(0, line.length - 1);
            for (let i = line.length; i < len; i++) {
                line += " ";
            }
        } else {
            let spaces = (len - count) / diff;
            let remainder = (len - count) % diff;

            for (let i = index; i < next; i++) {
                line += words[i];

                if (i < next - 1) {
                    let limit = spaces + (i - index < remainder ? 1 : 0);
                    for (let j = 0; j <= limit; j++) {
                        line += " ";
                    }
                }
            }
        }
        lines.push(line);
        index = next;
    }
    console.log(lines.join("\r"));
    result = "";

    return lines.join("\n");
};

module.exports = justify = (text, len) => {
    paragraphes = text.split("\r");
    paragraphes = paragraphes.filter((p) => p !== "\n");
    console.log(paragraphes);
    final = [];

    for (p in paragraphes) {
        final.push(justifyParagraph(paragraphes[p], len));
    }

    return final.join("\n");
};
