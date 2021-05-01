export interface IObsMessage {
  CommonMsg: CommonMsg;
  InterfaceResult: InterfaceResult;
}

export interface CommonMsg {
  Status: number;
  Code: string;
  Message: string;
  HostId: string;
  RequestId: string;
  InterfaceResult: null;
  Id2: string;
}

export interface InterfaceResult {
  ContentLength: string;
  Date: string;
  RequestId: string;
  Id2: string;
  ETag: string;
}
