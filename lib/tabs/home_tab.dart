import 'package:flutter/material.dart';
import 'package:storyme/tiles/record_tile.dart';

class HomeTab extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: ListView.builder(
          itemCount: 40,
          itemBuilder: (context, index) {
            return RecordTile();
          }),
    );
  }
}
