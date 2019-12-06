import {RefTypeDTO} from "../page/refTypeDTO";

export class RefValueDTO {
  public Id: number;
  public Value: string;
  public RefType: RefTypeDTO;
  public Name: string;
  public Status: boolean;
  public InsertDate: string;
  public UpdateDate: string;
  public IsActive: boolean;
}
