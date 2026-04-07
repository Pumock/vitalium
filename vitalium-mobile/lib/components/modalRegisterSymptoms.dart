import 'package:flutter/material.dart';

class SymptomBottomSheet extends StatelessWidget {
  const SymptomBottomSheet({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20.0),
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(20),
          topRight: Radius.circular(20),
        ),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Registrar Sintomas',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              IconButton(
                icon: const Icon(Icons.close),
                onPressed: () => Navigator.of(context).pop(),
              ),
            ],
          ),
          const SizedBox(height: 20),
  
          TextField(
            decoration: InputDecoration(
              hintText: 'Digite seus sintomas aqui...',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
              ),
              contentPadding: const EdgeInsets.symmetric(horizontal: 10, vertical: 12),
            ),
            maxLines: 4,
          ),
          const SizedBox(height: 10),

          ElevatedButton.icon(
            onPressed: () {
            },
            icon: const Icon(Icons.add_a_photo),
            label: const Text('Adicionar Imagem'),
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF016B3A),
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),
            ),
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: () {
              // Lógica para salvar
              Navigator.of(context).pop();
            },
            child: Text('Salvar', style: TextStyle(
            color: Colors.white,
          ),),
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF016B3A),
              padding: const EdgeInsets.symmetric(vertical: 16),
            ),
          ),
        ],
      ),
    );
  }
}