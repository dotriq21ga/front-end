export function timeProcessing(expireInSeconds: number) {
    return new Date(new Date().getTime() + 1000 * expireInSeconds)
}