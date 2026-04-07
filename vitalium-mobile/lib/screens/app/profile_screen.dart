import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  void _showOptionsBottomSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      builder: (_) {
        return Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ListTile(
                leading: CircleAvatar(
                  backgroundColor: Colors.grey[200],
                  child: Icon(
                    PhosphorIcons.image(),
                    color: Colors.grey[500],
                  ),
                ),
                title: const Text('Galeria'),
                onTap: () => Navigator.of(context).pop(),
              ),
              ListTile(
                leading: CircleAvatar(
                  backgroundColor: Colors.grey[200],
                  child: Icon(
                    PhosphorIcons.camera(),
                    color: Colors.grey[500],
                  ),
                ),
                title: const Text('Câmera'),
                onTap: () => Navigator.of(context).pop(),
              ),
              ListTile(
                leading: CircleAvatar(
                  backgroundColor: Colors.grey[200],
                  child: Icon(
                    PhosphorIcons.trash(),
                    color: Colors.grey[500],
                  ),
                ),
                title: const Text('Remover'),
                onTap: () => Navigator.of(context).pop(),
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Perfil",
          style: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 20,
            color: Colors.white,
          ),
        ),
        backgroundColor: const Color(0xFF22A16C),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Stack(
              children: [
                CircleAvatar(
                  radius: 75,
                  backgroundColor: Colors.grey[200],
                  child: const CircleAvatar(
                    radius: 65,
                    backgroundColor: Colors.grey,
                    child: Icon(Icons.person, size: 100, color: Colors.white),
                  ),
                ),
                Positioned(
                  bottom: 5,
                  right: 5,
                  child: CircleAvatar(
                    backgroundColor: Colors.grey[200],
                    child: IconButton(
                      onPressed: () => _showOptionsBottomSheet(context),
                      icon: Icon(
                        PhosphorIcons.pencilSimple(),
                        color: Colors.grey[400],
                      ),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),

            const Text(
              "Maria Silva",
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 4),
            const Text(
              "maria@email.com",
              style: TextStyle(
                fontSize: 18,
                color: Colors.grey,
              ),
            ),

            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {},
              child: const Text("Editar Perfil"),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF016B3A),
                foregroundColor: Colors.white,
              ),
            ),

            const SizedBox(height: 30),
            const Divider(),
            const SizedBox(height: 10),

            _profileMenuItem("Configurações", Icons.settings, () {}),
            _profileMenuItem("Informações", Icons.info, () {}),
            _profileMenuItem("Sair", Icons.logout, () {}, textColor: Colors.red),
          ],
        ),
      ),
    );
  }

  Widget _profileMenuItem(String title, IconData icon, VoidCallback onPress,
      {Color? textColor, bool endIcon = true}) {
    return ListTile(
      leading: Icon(icon, color: textColor ?? Colors.black),
      title: Text(
        title,
        style: TextStyle(color: textColor ?? Colors.black),
      ),
      trailing: endIcon ? const Icon(Icons.arrow_forward_ios, size: 16) : null,
      onTap: onPress,
    );
  }
}
