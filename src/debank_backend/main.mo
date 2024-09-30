import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor Debank {
  stable var currentValue : Float = 1;
  //  currentValue := 50;
  stable var startTime = Time.now();
  // startTime := Time.now();

  Debug.print(debug_show (startTime));
  // let now : () -> Time;
  Debug.print(debug_show(currentValue));
  // Debug.print(debug_show(id));
  public func topUp (amount : Float) {
    currentValue += amount;
    Debug.print(debug_show(currentValue));
  };

  public func withdraw (amount : Float){
    if(amount > currentValue){
      Debug.print("low balance!");
    }else{
      currentValue -= amount;
      Debug.print(debug_show (currentValue));
    }
  };

  public query func checkBalance() : async Float {
    return currentValue;
  };

  public func compound(){
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapsedS = timeElapsedNS / 60000000000 ;
    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedS));
    startTime := currentTime;
  }
}