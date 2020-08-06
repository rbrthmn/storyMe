import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class RecordTile extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return InkWell(
      child: Card(
        margin: EdgeInsets.symmetric(horizontal: 10, vertical: 5),
        child: Container(
          padding: EdgeInsets.all(10),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text("Título do dia",  style: TextStyle(fontSize: 20, fontWeight: FontWeight.w600),),
                  SizedBox(
                    height: 5,
                  ),
                  Text(
                    DateFormat('dd-MM-yyyy').format(DateTime.now()),
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
                  )
                ],
              ),
              Text("eu")
            ],
          ),
        ),
      ),
    );
  }
}
