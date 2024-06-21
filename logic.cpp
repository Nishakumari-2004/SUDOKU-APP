#include<iostream>
using namespace std;
#include<vector>
class Solution {
public:
void PrintBoard(vector<vector<char>>& board){

    for(int i=0;i<board.size();i++){
        for(int j=0;j<board.size();j++){
            cout<<board[i][j]<<" ";
        }
        cout<<endl;
    }
}   

bool isSafe(int row,int col,vector<vector<char>>& board,char val){
    for(int i=0;i<board.size();i++){
        //row check
        if(board[row][i]==val){
            return false;
        }
        //col check
        if(board[i][col]==val){
            return false;
        }
        //3*3 matrix
        if(board[3*(row/3)+ i/3][3*(col/3)+ i%3]==val){
            return false;
        }
    }
     return true;
}
    bool solveSudoku(vector<vector<char>>& board) {
        int n=board.size();

        for(int row=0;row<n;row++){
            for(int col=0;col<n;col++){
                //cell empty
                if(board[row][col]=='.'){
                    for(char val='1';val<='9';val++){
                        if(isSafe(row,col,board,val)){
                            board[row][col]=val;
                            //recursive call
                            if(solveSudoku(board))return true;
                            else{
                                //backtrack
                                board[row][col]='.';
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
};


int main(){
     vector<vector<char>> board = {
     {'5','3','.','.','7','.','.','.','.'},
     {'6','.','.','1','9','5','.','.','.'},
     {'.','9','8','.','.','.','.','6','.'},
     {'8','.','.','.','6','.','.','.','3'},
     {'4','.','.','8','.','3','.','.','1'},
     {'7','.','.','.','2','.','.','.','6'},
     {'.','6','.','.','.','.','2','8','.'},
     {'.','.','.','4','1','9','.','.','5'},
     {'.','.','.','.','8','.','.','7','9'}
     };

     Solution sol;
     sol.solveSudoku(board);
     sol.PrintBoard(board);

    return 0;
}