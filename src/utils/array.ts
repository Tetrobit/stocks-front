export function repeatArray<T>(arr: T[], n: number): T[] {
    let result: T[] = []
    for (let i = 0; i < n; i++) {
        result = result.concat(arr);
    }
    return result;
};
