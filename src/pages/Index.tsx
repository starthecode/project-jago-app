import { ArrowRight, Heart, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-image.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary fill-primary" />
            <span className="text-2xl font-bold text-foreground">
              Jaago India Jaago
            </span>
          </div>
          <div className="flex gap-4">
            <Link
              to="/auth"
              className="px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/auth"
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-10" />
        <div className="container mx-auto px-4 py-20 lg:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Empower Your Health,{' '}
                <span className="text-primary">Track Your Progress</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Join Jaago India Jaago - where NGO workers unite for fitness,
                wellness, and community building. Track attendance, monitor
                fitness goals, and celebrate healthy habits together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/auth"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-lg font-medium"
                >
                  Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <button className="px-8 py-3 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors text-lg font-medium">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src={heroImage}
                alt="Community fitness and wellness"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything You Need to Stay Active
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive platform designed for NGO teams to track
              attendance, fitness, and wellness goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Smart Attendance</h3>
              <p className="text-muted-foreground">
                Clock in/out with GPS tracking. Monitor your work hours and
                location seamlessly with accurate timestamping.
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Fitness Tracking</h3>
              <p className="text-muted-foreground">
                Connect with Google Fit to track your daily steps, calories, and
                activities. Stay motivated with real-time progress.
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Daily Wellness Tasks</h3>
              <p className="text-muted-foreground">
                Receive daily health challenges from your admin. Build healthy
                habits and compete with your team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-[var(--gradient-hero)] rounded-2xl p-12 md:p-16 text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Wellness Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join hundreds of NGO workers who are already tracking their
              fitness and building healthier habits together.
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-lg font-medium"
            >
              Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>
            &copy; 2025 Jaago India Jaago. Empowering health and wellness in NGO
            communities.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
