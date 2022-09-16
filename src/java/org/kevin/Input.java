/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.kevin;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Administrator
 */
public class Input {
    List<InputData> lsInputData=new ArrayList<>();
    int lsInputData_now=-1;
    String name;
    String id;
    int width;
    int type=0;
    Input(String _id,String _name,int _width)
    {
        name=_name;
        id=_id;
        width=_width;
    }        
    public void add(int _itype,int _dtype,String[] _paraA){
        lsInputData.add(new InputData(_itype,_dtype,_paraA));
        lsInputData_now=lsInputData.size()-1;
    }

    public void add(int _itype,int _dtype,int _length,int _height,String[] _paraA){
        lsInputData.add(new InputData(_itype,_dtype,_length,_height,_paraA));
        lsInputData_now=lsInputData.size()-1;
    }
    
    public void clear(){
        lsInputData.clear();
        lsInputData_now=-1;
    }
    
}


class InputData {
    String[] paraA;
    int itype;
    int dtype;
    int length=0;
    int height=0;
    InputData(int _itype,int _dtype,String[] _paraA){
        itype=_itype;
        dtype=_dtype;
        paraA=new String[_paraA.length];
        for(int i=0;i<_paraA.length;i++)
            paraA[i]=_paraA[i];
    }

    InputData(int _itype,int _dtype,int _length,int _height,String[] _paraA){
        length=_length;
        height=_height;
        itype=_itype;
        dtype=_dtype;
        paraA=new String[_paraA.length];
        for(int i=0;i<_paraA.length;i++)
            paraA[i]=_paraA[i];
    }
    
    
    
}
