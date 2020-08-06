import 'package:flutter/material.dart';

class NewRecordButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return FloatingActionButton(
      child: Icon(Icons.add, color: Colors.white,),
      onPressed: (){

      },
      backgroundColor: Theme.of(context).primaryColor,
    );
  }
}
