import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Avatar,
    Chip,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    LinearProgress,
    Skeleton,
    Container,
    useTheme,
    styled,
    alpha
} from '@mui/material';
import {
    People as PeopleIcon,
    School as SchoolIcon,
    PersonPin as TeacherIcon,
    Quiz as QuizIcon,
    HelpOutline as QuestionIcon,
    Assessment as AssessmentIcon,
    TrendingUp as TrendingUpIcon,
    Star as StarIcon,
    EmojiEvents as TrophyIcon
} from '@mui/icons-material';
import dashboardApi from '../../../../http/dashboard';

// Styled components
const StyledCard = styled(Card)(({ theme, color }) => ({
    background: `linear-gradient(135deg, ${color}15 0%, ${color}25 100%)`,
    border: `1px solid ${alpha(color, 0.2)}`,
    borderRadius: theme.spacing(2),
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: `0 12px 40px ${alpha(color, 0.3)}`,
        borderColor: alpha(color, 0.4),
    },
}));

const StyledAvatar = styled(Avatar)(({ theme, color }) => ({
    background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`,
    width: 56,
    height: 56,
    boxShadow: `0 8px 24px ${alpha(color, 0.3)}`,
}));

const StatsCard = ({ title, value, icon, color, loading }) => {
    return (
        <StyledCard color={color}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <StyledAvatar color={color}>
                        {loading ? <Skeleton variant="circular" width={24} height={24} /> : icon}
                    </StyledAvatar>
                    <Box sx={{ ml: 2, flex: 1 }}>
                        <Typography
                            variant="h4"
                            component="div"
                            sx={{
                                fontWeight: 700,
                                color: 'text.primary',
                                mb: 0.5
                            }}
                        >
                            {loading ? <Skeleton width={60} /> : value}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                fontWeight: 500
                            }}
                        >
                            {loading ? <Skeleton width={80} /> : title}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </StyledCard>
    );
};

const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const response = await dashboardApi().getDashboardData();
            setDashboardData(response.data.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return theme.palette.success.main;
        if (score >= 60) return theme.palette.warning.main;
        return theme.palette.error.main;
    };

    return (
        <Box sx={{
            height: '100vh',
            overflow: 'auto',
            '&::-webkit-scrollbar': {
                width: '8px',
            },
            '&::-webkit-scrollbar-track': {
                background: alpha(theme.palette.grey[500], 0.1),
                borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
                background: alpha(theme.palette.primary.main, 0.3),
                borderRadius: '4px',
                '&:hover': {
                    background: alpha(theme.palette.primary.main, 0.5),
                },
            },
        }}>
            <Container maxWidth="xl" sx={{ py: 3 }}>
                {/* Welcome Section */}
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="h3"
                        component="h1"
                        sx={{
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 1
                        }}
                    >
                        Admin Dashboard
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Dobrodošli u admin panel - pregled sistema
                    </Typography>
                </Box>

                {/* Overview Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={4}>
                        <StatsCard
                            title="Ukupno korisnika"
                            value={dashboardData?.overview?.totalUsers}
                            icon={<PeopleIcon />}
                            color={theme.palette.primary.main}
                            loading={loading}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <StatsCard
                            title="Studenti"
                            value={dashboardData?.overview?.totalStudents}
                            icon={<SchoolIcon />}
                            color={theme.palette.info.main}
                            loading={loading}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <StatsCard
                            title="Nastavnici"
                            value={dashboardData?.overview?.totalTeachers}
                            icon={<TeacherIcon />}
                            color={theme.palette.secondary.main}
                            loading={loading}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <StatsCard
                            title="Kvizovi"
                            value={dashboardData?.overview?.totalQuizzes}
                            icon={<QuizIcon />}
                            color={theme.palette.success.main}
                            loading={loading}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <StatsCard
                            title="Pitanja"
                            value={dashboardData?.overview?.totalQuestions}
                            icon={<QuestionIcon />}
                            color={theme.palette.warning.main}
                            loading={loading}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <StatsCard
                            title="Pokušaji"
                            value={dashboardData?.overview?.totalAttempts}
                            icon={<AssessmentIcon />}
                            color={theme.palette.error.main}
                            loading={loading}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    {/* Score Statistics */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ borderRadius: 2, height: '100%' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <StyledAvatar color={theme.palette.success.main}>
                                        <TrendingUpIcon />
                                    </StyledAvatar>
                                    <Typography variant="h6" sx={{ ml: 2, fontWeight: 600 }}>
                                        Statistike rezultata
                                    </Typography>
                                </Box>

                                {loading ? (
                                    <Box>
                                        <Skeleton height={60} sx={{ mb: 2 }} />
                                        <Skeleton height={60} sx={{ mb: 2 }} />
                                        <Skeleton height={60} sx={{ mb: 2 }} />
                                    </Box>
                                ) : (
                                    <Box>
                                        <Box sx={{ mb: 3 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    Prosječni rezultat
                                                </Typography>
                                                <Typography variant="h6" color="primary.main" fontWeight={600}>
                                                    {dashboardData?.scoreStatistics?.averageScore || 0}%
                                                </Typography>
                                            </Box>
                                            <LinearProgress
                                                variant="determinate"
                                                value={dashboardData?.scoreStatistics?.averageScore || 0}
                                                sx={{ height: 8, borderRadius: 1 }}
                                            />
                                        </Box>

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Typography variant="h5" color="success.main" fontWeight={700}>
                                                    {dashboardData?.scoreStatistics?.highestScore || 0}%
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    Najveći rezultat
                                                </Typography>
                                            </Box>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Typography variant="h5" color="error.main" fontWeight={700}>
                                                    {dashboardData?.scoreStatistics?.lowestScore || 0}%
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    Najmanji rezultat
                                                </Typography>
                                            </Box>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Typography variant="h5" color="info.main" fontWeight={700}>
                                                    {dashboardData?.scoreStatistics?.totalValidScores || 0}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    Validni rezultati
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Recent Activity */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ borderRadius: 2, height: '100%' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <StyledAvatar color={theme.palette.info.main}>
                                        <AssessmentIcon />
                                    </StyledAvatar>
                                    <Typography variant="h6" sx={{ ml: 2, fontWeight: 600 }}>
                                        Nedavna aktivnost
                                    </Typography>
                                </Box>

                                {loading ? (
                                    <List>
                                        {[1, 2, 3].map((item) => (
                                            <ListItem key={item}>
                                                <ListItemAvatar>
                                                    <Skeleton variant="circular" width={40} height={40} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={<Skeleton width="80%" />}
                                                    secondary={<Skeleton width="60%" />}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                ) : (
                                    <List>
                                        {dashboardData?.recentActivity?.length > 0 ? (
                                            dashboardData.recentActivity.map((activity, index) => (
                                                <ListItem key={index} divider={index < dashboardData.recentActivity.length - 1}>
                                                    <ListItemAvatar>
                                                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                                                            {activity.studentId?.firstName?.charAt(0)}{activity.studentId?.lastName?.charAt(0)}
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant="body1" fontWeight={500}>
                                                                {activity.studentId?.firstName} {activity.studentId?.lastName}
                                                            </Typography>
                                                        }
                                                        secondary={
                                                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                                                <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                                                                    Rezultat:
                                                                </Typography>
                                                                <Chip
                                                                    label={activity.score}
                                                                    size="small"
                                                                    color="primary"
                                                                    variant="outlined"
                                                                />
                                                            </Box>
                                                        }
                                                    />
                                                </ListItem>
                                            ))
                                        ) : (
                                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    Nema nedavne aktivnosti
                                                </Typography>
                                            </Box>
                                        )}
                                    </List>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Popular Quizzes */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ borderRadius: 2, height: '100%' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <StyledAvatar color={theme.palette.warning.main}>
                                        <QuizIcon />
                                    </StyledAvatar>
                                    <Typography variant="h6" sx={{ ml: 2, fontWeight: 600 }}>
                                        Popularni kvizovi
                                    </Typography>
                                </Box>

                                {loading ? (
                                    <List>
                                        {[1, 2, 3, 4, 5].map((item) => (
                                            <ListItem key={item}>
                                                <ListItemText
                                                    primary={<Skeleton width="70%" />}
                                                    secondary={<Skeleton width="50%" />}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                ) : (
                                    <List>
                                        {dashboardData?.popularQuizzes?.slice(0, 5).map((quiz, index) => (
                                            <ListItem key={quiz._id} divider={index < 4}>
                                                <ListItemText
                                                    primary={
                                                        <Typography variant="body1" fontWeight={500}>
                                                            {quiz.quizname}
                                                        </Typography>
                                                    }
                                                    secondary={
                                                        <Box>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {quiz.quizdescription}
                                                            </Typography>
                                                            <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                                                                <Chip
                                                                    label={`${quiz.questionCount} pitanja`}
                                                                    size="small"
                                                                    variant="outlined"
                                                                />
                                                                <Chip
                                                                    label={`${quiz.attemptCount} pokušaja`}
                                                                    size="small"
                                                                    variant="outlined"
                                                                    color="info"
                                                                />
                                                            </Box>
                                                        </Box>
                                                    }
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Top Students */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ borderRadius: 2, height: '100%' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <StyledAvatar color={theme.palette.success.main}>
                                        <TrophyIcon />
                                    </StyledAvatar>
                                    <Typography variant="h6" sx={{ ml: 2, fontWeight: 600 }}>
                                        Najbolji studenti
                                    </Typography>
                                </Box>

                                {loading ? (
                                    <List>
                                        {[1, 2, 3].map((item) => (
                                            <ListItem key={item}>
                                                <ListItemAvatar>
                                                    <Skeleton variant="circular" width={40} height={40} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={<Skeleton width="80%" />}
                                                    secondary={<Skeleton width="60%" />}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                ) : (
                                    <List>
                                        {dashboardData?.topStudents?.length > 0 ? (
                                            dashboardData.topStudents.map((student, index) => (
                                                <ListItem key={student._id} divider={index < dashboardData.topStudents.length - 1}>
                                                    <ListItemAvatar>
                                                        <Avatar sx={{ bgcolor: getScoreColor(student.averageScore) }}>
                                                            {index === 0 && <TrophyIcon />}
                                                            {index === 1 && <StarIcon />}
                                                            {index > 1 && `${index + 1}`}
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant="body1" fontWeight={500}>
                                                                {student.studentName}
                                                            </Typography>
                                                        }
                                                        secondary={
                                                            <Box>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {student.email}
                                                                </Typography>
                                                                <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                                                                    <Chip
                                                                        label={`${student.averageScore}% prosijek`}
                                                                        size="small"
                                                                        sx={{
                                                                            bgcolor: alpha(getScoreColor(student.averageScore), 0.1),
                                                                            color: getScoreColor(student.averageScore)
                                                                        }}
                                                                    />
                                                                    <Chip
                                                                        label={`${student.totalAttempts} pokušaja`}
                                                                        size="small"
                                                                        variant="outlined"
                                                                    />
                                                                </Box>
                                                            </Box>
                                                        }
                                                    />
                                                </ListItem>
                                            ))
                                        ) : (
                                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    Nema podataka o studentima
                                                </Typography>
                                            </Box>
                                        )}
                                    </List>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default AdminDashboard;