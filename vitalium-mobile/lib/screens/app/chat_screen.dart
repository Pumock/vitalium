import 'package:flutter/material.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  String selectedPerson = "Secretária";
  final Map<String, List<Map<String, String>>> chats = {
    "Secretária": [
      {"text": "Olá! Como posso te ajudar?", "sender": "other"},
    ],
    "Médica": [
      {
        "text": "Oi, tudo bem? Como você está se sentindo hoje?",
        "sender": "other"
      },
    ],
    "Enfermeira": [
      {
        "text": "Oi! Estou aqui para acompanhar seu tratamento.",
        "sender": "other"
      },
    ],
  };

  final TextEditingController _controller = TextEditingController();

  void _sendMessage() {
    if (_controller.text.isEmpty) return;

    setState(() {
      chats[selectedPerson]!.add({"text": _controller.text, "sender": "me"});
      _controller.clear();
    });
  }

  void _switchPerson(String person) {
    setState(() {
      selectedPerson = person;
    });
  }

  @override
  Widget build(BuildContext context) {
    final messages = chats[selectedPerson]!;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Chat - $selectedPerson",
          style: const TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 20,
            color: Colors.white,
          ),
        ),
        backgroundColor: const Color(0xFF22A16C),
        centerTitle: true,
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                _personButton("Secretária"),
                const SizedBox(width: 8),
                _personButton("Médica"),
                const SizedBox(width: 8),
                _personButton("Enfermeira"),
              ],
            ),
          ),
          const Divider(height: 1),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(8),
              itemCount: messages.length,
              itemBuilder: (context, index) {
                final message = messages[index];
                final isMe = message["sender"] == "me";
                return Align(
                  alignment:
                      isMe ? Alignment.centerRight : Alignment.centerLeft,
                  child: Container(
                    padding:
                        const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
                    margin: const EdgeInsets.symmetric(vertical: 4),
                    decoration: BoxDecoration(
                      color:
                          isMe ? const Color(0xFF22A16C) : Colors.grey.shade300,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      message["text"]!,
                      style: TextStyle(
                          color: isMe ? Colors.white : Colors.black87),
                    ),
                  ),
                );
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: const InputDecoration(
                      hintText: "Digite uma mensagem...",
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(12)),
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                IconButton(
                  icon: const Icon(Icons.send, color: Color(0xFF22A16C)),
                  onPressed: _sendMessage,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _personButton(String person) {
    final isSelected = selectedPerson == person;
    return Expanded(
      child: ElevatedButton(
        onPressed: () => _switchPerson(person),
        style: ElevatedButton.styleFrom(
          backgroundColor:
              isSelected ? const Color(0xFF016B3A) : Colors.grey.shade300,
          padding: const EdgeInsets.symmetric(vertical: 12),
        ),
        child: Text(
          person,
          style: TextStyle(
              color: isSelected ? Colors.white : Colors.black87,
              fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}
