import {RefTypeDto} from "../page/ref-type-dto";

export class RefValueDto{
  public Id: number;
  public Value: string;
  public RefType: RefTypeDto;
  public Name: string;
  public Status: boolean;
  public IsActive: boolean;
}

