#include<iostream>
using namespace std;
int main(){
    int amount;
    cout << "Enter Amount : " ;
    cin >> amount;
    int hundred=0,fifty = 0, twenty=0,chillar=0;
    if(amount >= 100){
        hundred += amount/100;
        amount %= 100;
    }
    if(amount >= 50){
        fifty += amount/50;
        amount %= 50;
    }
    if(amount >= 20){
        twenty += amount/20;
        amount %= 20;
    }
    chillar = amount;

    cout << "Hundred : " << hundred << endl;
    cout << "Fifty : " << fifty << endl;
    cout << "Twenty : " << twenty << endl;
    cout << "Chillar : " << chillar << endl;
}