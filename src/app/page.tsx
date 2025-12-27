'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface Question {
  id: number;
  question: string;
  answer: string;
  category: string | null;
  createdAt: string;
}

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [open, setOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ question: '', answer: '', category: '' });

  // 質問一覧を取得
  const fetchQuestions = async () => {
    try {
      const res = await fetch('/api/questions');
      const data = await res.json();
      setQuestions(data);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // 新しい質問を追加
  const handleAddQuestion = async () => {
    if (!newQuestion.question || !newQuestion.answer) {
      alert('質問と回答を入力してください');
      return;
    }

    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuestion),
      });

      if (res.ok) {
        setNewQuestion({ question: '', answer: '', category: '' });
        setOpen(false);
        fetchQuestions();
      }
    } catch (error) {
      console.error('Failed to create question:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          📚 Study Q&A App
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          質問を追加
        </Button>
      </Box>

      <Grid container spacing={3}>
        {questions.map((q) => (
          <Grid item xs={12} key={q.id}>
            <Card>
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  {q.category && (
                    <Chip label={q.category} size="small" color="primary" sx={{ mr: 1 }} />
                  )}
                </Box>
                <Typography variant="h6" gutterBottom>
                  Q: {q.question}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  A: {q.answer}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                  {new Date(q.createdAt).toLocaleString('ja-JP')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 質問追加ダイアログ */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>新しい質問を追加</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="カテゴリ（任意）"
            value={newQuestion.category}
            onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="質問"
            value={newQuestion.question}
            onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="回答"
            value={newQuestion.answer}
            onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
            margin="normal"
            multiline
            rows={4}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>キャンセル</Button>
          <Button onClick={handleAddQuestion} variant="contained">
            追加
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
