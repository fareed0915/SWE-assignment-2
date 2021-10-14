/**
 * Fareed Balogun @02895579
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */


exports.findAllSolutions = function(grid, dictionary) {
  let solutions = [];
   
   lowerCase(grid,dictionary);
   let trie  = MakeTrie(dictionary);
   
   


  // Check if  input is empty
  if(grid == null || dictionary == null){
    return solutions;
  }


  // Check  NXN
  let lgth = grid.length;
   
   
  if(lgth==0){
    return solutions;
    console.log(lgth);
  }
 
  for(let  i=0; i<lgth;i++){
    if(grid[i].length!= lgth ){
      return solutions;
    }
  }

   
   
  //iteration  
  let solutionset=new  Set();
  

   
   for(let b= 0; b<lgth ; b++){
     for(let a= 0; a<lgth ; a++){
       
       
       let term= "";
       
       let passed = new Array(lgth).fill(false).map(() => new Array(lgth).fill(false));
       
       findterms(term,a,b,grid,passed,trie,solutionset);
       
       
       
       
     }
   }
   
   
   
   
   
   
   
  solutions= Array.from(solutionset)
  return solutions;
}




var TrieNode = function(value) {
  this.value=value;
  this.children = new Array();
  this.isWord = false;
};




var MakeTrie = function(dict) {
  var root = new TrieNode('');
  
  if(dict.length==0){
    return;
  }

 
  for(let terms of dict){
    var node = root;

    for(let  i =0;i<terms.length;i++){
      var letter = terms[i];
      var ord  = letter.charCodeAt(0) - 97;
      var curNode = node.children[ord];
      if(node.children[ord]== undefined){
       
        
        var curNode = new TrieNode(letter);
        node.children[ord]=curNode;
        
        

      
      }
      

      node=curNode;
      
      
    }
    node.isWord=true; 
    
  }
  return root;
};





findterms=function(term,a,b,grid,passed,trie,solutionset){
 
  
  
  let adj_mtx =[[0,1],[1,0],[0,-1],[-1,0],[1,1],[-1,1],[1,-1],[-1,-1]];
  
  

  
  if(b<0 || a<0 || b>=grid.length || a >=grid.length || passed[a][b]==true){
    return;
  }
  
  
  

  
  term +=  grid[a][b];
  

  if(isprefix(term,trie)){
     passed[a][b]=true;
    
      if (isword(term,trie)){
        
        
       
        if(term.length>2){
          
          solutionset.add(term);
        }
   
      }
    


  
  for(let i=0;i<8;i++){
    findterms(term,a+adj_mtx[i][0],b+adj_mtx[i][1],grid,passed,trie,solutionset)
    
    
  }
  
}

  
  passed[a][b]=false
  
     
     
   }





isprefix= function(term,trie){

  let subword=''
  
  let curNode=trie;
  
  for(let i =0;i<term.length;i++){
    
    if(curNode!=undefined){
      
      for(let node of curNode.children){
        
        if(node!=undefined && node.value==term[i]){
          subword+=term[i];
          curNode=node;
          break;
        }
      }
    }
  }
  if(term==subword){
    
    return true;
  }
  
   return false;
  
}

isword= function(term,trie){

  
  let subword=''
  let curNode=trie;
  
  for(let i =0;i<term.length;i++){
    
    if(curNode!=undefined){
      
      for(let node of curNode.children){
        
        if(node!=undefined && node.value==term[i]){
          subword+=term[i];
          curNode=node;
          break;
        }
      }
    }
  }
  if(term==subword && curNode.isWord==true){
    
    return true;
  }
  
   return false;
  
  
  
  
}



lowerCase=function(grid,dict){
  for(let i=0;i<grid.length;i++){
    for(let j=0;j<grid.length;j++){
      if(grid[i][j]){
        grid[i][j]= grid[i][j].toLowerCase();
      }
      
    }
    
  }
  
  for(let j=0;j<dict.length;j++){
      dict[j]=dict[j].toLowerCase();
    }
  
  
  
  
}




var grid = [  ['t', 'w', 'y', 'r'],
              ['e', 'n', 'p', 'h'],
              ['g', 'z', 'qu','r'],
              ['o', 'n', 't', 'a']];
var dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
                    'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
                    'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];











