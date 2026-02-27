export function formatProductTitle(title: string) {
    // Rule 1 → cut before "with"
    const withoutWith = title.split(/ with /i)[0].trim()
    const words = withoutWith.split(" ")

    for (let i = 2; i < words.length; i++) {
        // standalone number (integer or decimal)
        if (/^\d+(\.\d+)?$/.test(words[i])) {
            // return words until number + next word
            return words.slice(0, i + 2).join(" ")
        }
    }

     // fallback
    return withoutWith
}