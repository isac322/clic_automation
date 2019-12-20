import {TooManyLinesError} from './exceptions'

export class Slide {
    public static readonly MAX_LINE = 2;

    public readonly contents: String;
    public readonly lineCount: number;

    public constructor(contents: String) {
        this.contents = contents.trim();
        this.lineCount = this.contents.split(/\r\n|\r|\n/).length;

        if (this.lineCount > Slide.MAX_LINE) {
            throw new TooManyLinesError(`Slide exceed maximum line: ${this.lineCount} (maximum: ${Slide.MAX_LINE})`);
        }
    }
}